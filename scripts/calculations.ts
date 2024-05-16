export function getSunriseTime(year:number,day_of_year : number, hr : number, long:number, lat:number)
{
    /**
     * Calculates the UTC time for sunrise given a current year, day of year, current hour, and longitude and latitude
     * @param year - The current year
     * @param day_of_year - The current day of the year
     * @param hr - The current hour
     * @param long - The position's longitude
     * @param lat - The position's latitude
     * 
     * @remarks - I'm not sure why we need to provide an hour for this kind of thing. I'm not going to argue with the astronomical maths gods
     */

    return getZenithTime(year, day_of_year, hr, long, lat, 90.833, true);
}

export function getSunsetTime(year:number, day_of_year : number, hr : number, long:number, lat:number)
{
    /**
     * Calculates the UTC time for sunset given a current year, day of year, current hour, and longitude and latitude
     * @param year - The current year
     * @param day_of_year - The current day of the year
     * @param hr - The current hour
     * @param long - The position's longitude
     * @param lat - The position's latitude
     * 
     * @remarks - I'm not sure why we need to provide an hour for this kind of thing. I'm not going to argue with the astronomical maths gods
     */

    return getZenithTime(year, day_of_year, hr, long, lat, 90.833, false);
}

export function getZenithTime(year:number, day_of_year:number, hr:number, long:number, lat:number, zenith:number, am:boolean)
{
    /**
     * Calculate the time at which the sun's zenith angle is at the given parameter
     * @param year - The current year
     * @param day_of_year - The current day of the year
     * @param hr - The current hour
     * @param long - The position's longitude
     * @param lat - The position's latitude
     * @param zenith - The desired zenith angle of the sun
     * @param am - true for a morning value, false for an evening value
     * 
     * @remarks - I'm not sure why we need to provide an hour for this kind of thing. I'm not going to argue with the astronomical maths gods
     */

    // First calculate the fractional year, gamma
    // Remember to use 366 if we are in a leap year!
    let days_in_year = year % 4 == 0 ? 366 : 365;
    let gamma = (2*Math.PI/days_in_year) * (day_of_year - 1 + (hr-12)/24);

    // Work out the equation of time in mins
    let eqtime = 229.18*(0.000075 + 0.001868 * Math.cos(gamma) - 0.032077 * Math.sin(gamma)
                - 0.014615 * Math.cos(2*gamma) - 0.040849 * Math.sin(2*gamma));
    // Work out the solar declination angle in radians
    let decl = 0.006918 - 0.399912 * Math.cos(gamma) + 0.070257 * Math.sin(gamma) 
                - 0.006758 * Math.cos(2*gamma) + 0.000907 * Math.sin(2*gamma)
                - 0.002697 * Math.cos(3*gamma) + 0.00148 * Math.sin(3*gamma);

    // Change our latitude to radians
    let lat_rad = lat * (Math.PI/180)

    // Calculate solar hour angle in degrees for the zenith
    let am_or_pm = am ? 1 : -1;
    let ha = am_or_pm * (180/Math.PI) * Math.acos( (Math.cos(zenith*(Math.PI/180)) / (Math.cos(lat_rad)*Math.cos(decl))) - Math.tan(lat_rad) * Math.tan(decl) );

    let time = 720 - 4*(long + ha) - eqtime;

    return time/60;
}

export function pptime(hr:number, twenty_four_hr : boolean)
{
    /**
     * Gives a pretty print of time in 12 or 24 hour format.
     * @param hr - fractional 24 hours
     * @param twenty_four_hr - print in 24 hour format?
     */
    if (twenty_four_hr)
    {
        return Math.floor(hr).toString().padStart(2, '0') + ":" + Math.round(60*(hr-Math.floor(hr))).toString().padStart(2, '0');
    }
    else 
    {
        let isPM = false;
        if (hr >= 13)
        {
            hr -= 12;
            isPM = true;
        }
        return Math.floor(hr).toString().padStart(2, '0') + ":" + Math.round(60*(hr-Math.floor(hr))).toString().padStart(2, '0') + (isPM ? "pm" : "am");
    }
}

//We are going to use an approximation. The golden hour angle is never the same but 7 degrees seems to be correct
export const goldenHourZenithAngle = 83;

//The blue hour angle is also never the same but -8 seems to be good enough
export const blueHourZenithAngle = 98;