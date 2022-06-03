import fetch from 'node-fetch';

let SJ_HEADERS = {
    'content-type': 'application/json',
    'X-RapidAPI-Host': 'scrapeninja.p.rapidapi.com',
    'X-RapidAPI-Key': null
};


export const getHeaders = async () => {
    const url = 'https://scrapeninja.p.rapidapi.com/scrape-js';

    SJ_HEADERS['X-RapidAPI-Key'] = process.env.RAPIDAPI_KEY;
    const options = {
        method: 'POST',
        headers: SJ_HEADERS,
        body: '{"url":"https://www.virginatlantic.com/flight-search/book-a-flight","waitForSelector": ".advanced-search-heading","geo":"de","retryNum":2, "catchAjaxHeadersUrlMask":"air-shopping/advancesearch.data.json", "blockImages":1}'
    };

    // "catchAjaxHeadersUrlMask":"air-shopping/advancesearch.data.json",

    let res = await fetch(url, options)
    console.log('res.status', res.status);
    let json = await res.json();

    console.log('res.json', json);

    return json.info.catchedAjax.headers;
        
}


export const scrape = async (headers) => {

    
    const url = 'https://scrapeninja.p.rapidapi.com/scrape';
    SJ_HEADERS['X-RapidAPI-Key'] = process.env.RAPIDAPI_KEY;

    let searchParams = {"bestFare":"VSLT","action":"findFlights","destinationAirportRadius":{"unit":"MI","measure":100},"deltaOnlySearch":false,"meetingEventCode":"","originAirportRadius":{"unit":"MI","measure":100},"passengers":[{"type":"ADT","count":1}],"searchType":"flexDateSearch","segments":[{"departureDate":"2022-06-04","destination":"JFK","origin":"TLV"}],"shopType":"MILES","tripType":"ONE_WAY","priceType":"Award","priceSchedule":"AWARD","awardTravel":true,"refundableFlightsOnly":false,"nonstopFlightsOnly":"false","datesFlexible":true,"flexCalendar":false,"flexAirport":false,"upgradeRequest":false,"pageName":"FLEX_DATE","cacheKey":"b95618f4-2ab3-4c39-b281-16fe3b86991a","requestPageNum":"","selectedSolutions":[],"actionType":"","initialSearchBy":{"fareFamily":"VSLT","meetingEventCode":"","refundable":false,"flexAirport":false,"flexDate":true,"flexDaysWeeks":"FLEX_DAYS"}};

    searchParams = {"tripType":"ONE_WAY","shopType":"MILES","priceType":"Award","nonstopFlightsOnly":"false","bookingPostVerify":"RTR_YES","bundled":"off","segments":[{"origin":"TLV","destination":"JFK","departureDate":"2022-06-04","connectionAirportCode":null}],"destinationAirportRadius":{"measure":100,"unit":"MI"},"originAirportRadius":{"measure":100,"unit":"MI"},"flexAirport":false,"flexDate":true,"flexDaysWeeks":"FLEX_DAYS","passengers":[{"count":1,"type":"ADT"}],"meetingEventCode":"","bestFare":"VSLT","searchByCabin":true,"cabinFareClass":null,"refundableFlightsOnly":false,"deltaOnlySearch":"false","initialSearchBy":{"fareFamily":"VSLT","cabinFareClass":null,"meetingEventCode":"","refundable":false,"flexAirport":false,"flexDate":true,"flexDaysWeeks":"FLEX_DAYS"},"searchType":"flexDateSearch","searchByFareClass":null,"pageName":"FLEX_DATE","requestPageNum":"","action":"findFlights","actionType":"","priceSchedule":"AWARD","schedulePrice":"miles","shopWithMiles":"on","awardTravel":"true","datesFlexible":true,"flexCalendar":false,"upgradeRequest":false,"is_Flex_Search":true};


    let ajaxHeadersForSearch = [ 
        "authority: www.virginatlantic.com",
        "accept: application/json",
        "accept-language: en-US,en;q=0.9,ru;q=0.8",
        "cache-control: no-cache",
        "cachekey: 0c2d5358-35e3-4d49-94aa-6733d9b5830c",
        "content-type: application/json; charset=UTF-8",
        "origin: https://www.virginatlantic.com",
        "pragma: no-cache",
        "referer: https://www.virginatlantic.com/flight-search/book-a-flight",
        "sec-ch-ua: \" Not A;Brand\";v=\"99\", \"Chromium\";v=\"102\", \"Google Chrome\";v=\"102\"",
        "sec-ch-ua-mobile: ?0",
        "sec-ch-ua-platform: \"macOS\"",
        "sec-fetch-dest: empty",
        "sec-fetch-mode: cors",
        "sec-fetch-site: same-origin",
        "user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36",
        "x-app-channel: sl-sho",
        "x-app-refresh: ",
        "x-app-route: SL-RSB"
    ];

    // from step1.js headers, we only need cookie header (and make sure 'referer' header is the same!)
    let cookieHeader = headers
        .filter(v => { return v.startsWith('cookie: ') || v.startsWith('Cookie: ') })
        .map(v => v.replace('Cookie: ', 'cookie: '));

    let dedupedHeaders = ajaxHeadersForSearch.concat(cookieHeader);


    let body =  {
        "url": "https://www.virginatlantic.com/shop/ow/flexdatesearch",
        "method": "POST",
        headers: dedupedHeaders,
        "geo":"de",
        "data": JSON.stringify(searchParams)
    };

    const options = {
        method: 'POST',
        headers: SJ_HEADERS,
        body: JSON.stringify(body)
    };

    // "catchAjaxHeadersUrlMask":"air-shopping/advancesearch.data.json",

    let res = await fetch(url, options)
    console.log('res.status', res.status);
    let json = await res.json();

    console.log('scrape.json', json);

    return json;
}