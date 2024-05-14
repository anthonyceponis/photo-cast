export function sunrise(day_of_year : number, hr : number, mn : number, sc : number, timezone : number, long:number, lat:number)
{
    // First calculate the fractional year, gamma
    // Remember to use 366 if we are in a leap year!
    let gamma = (2*Math.PI/365) * (day_of_year - 1 + (hr-12)/24);

    // Work out the equation of time in mins
    let eqtime = 229.18*(0.000075 + 0.001868 * Math.cos(gamma) - 0.032077 * Math.sin(gamma)
                - 0.014615 * Math.cos(2*gamma) - 0.040849 * Math.sin(2*gamma));
    // Work out the solar declination angle in radians
    let decl = 0.006918 - 0.399912 * Math.cos(gamma) + 0.070257 * Math.sin(gamma) 
                - 0.006758 * Math.cos(2*gamma) + 0.000907 * Math.sin(2*gamma)
                - 0.002697 * Math.cos(3*gamma) + 0.00148 * Math.sin(3*gamma);

    // Find time offset in minutes
    let time_offset = eqtime + 4*long - 60*timezone;

    // Calculate true solar time
    let tst = hr * 60 + mn + sc/60 + time_offset;

    // Change our latitude to radians
    let lat_rad = lat * (Math.PI/180)

    // Calculate solar hour angle in degrees for sunrise/sunset
    let ha = (180/Math.PI) * Math.acos( (Math.cos(90.833*(Math.PI/180)) / (Math.cos(lat_rad)*Math.cos(decl))) - Math.tan(lat_rad) * Math.tan(decl) );

    let sunrise = 720 - 4*(long + ha) - eqtime;

    return sunrise;
}