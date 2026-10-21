/**
 * Countries offered by the phone field's flag dropdown, with the length of the national number
 * (without the country code or a leading trunk "0"). Pure TypeScript so the browser and the API
 * validate a number the same way. Phone values are stored as "+<dial> <national digits>".
 */

export type PhoneCountry = { iso: string; name: string; dial: string; min: number; max: number };

export const DEFAULT_PHONE_COUNTRY = "GB";

// [iso, name, dial code, fewest digits, most digits] — national number lengths (mobile and landline).
const COUNTRY_DATA: [string, string, string, number, number][] = [
  ["AF", "Afghanistan", "93", 9, 9],
  ["AL", "Albania", "355", 8, 9],
  ["DZ", "Algeria", "213", 8, 9],
  ["AD", "Andorra", "376", 6, 9],
  ["AO", "Angola", "244", 9, 9],
  ["AG", "Antigua and Barbuda", "1", 10, 10],
  ["AR", "Argentina", "54", 10, 11],
  ["AM", "Armenia", "374", 8, 8],
  ["AU", "Australia", "61", 9, 9],
  ["AT", "Austria", "43", 7, 13],
  ["AZ", "Azerbaijan", "994", 9, 9],
  ["BS", "Bahamas", "1", 10, 10],
  ["BH", "Bahrain", "973", 8, 8],
  ["BD", "Bangladesh", "880", 8, 10],
  ["BB", "Barbados", "1", 10, 10],
  ["BY", "Belarus", "375", 9, 9],
  ["BE", "Belgium", "32", 8, 9],
  ["BZ", "Belize", "501", 7, 7],
  ["BJ", "Benin", "229", 8, 10],
  ["BT", "Bhutan", "975", 7, 8],
  ["BO", "Bolivia", "591", 8, 8],
  ["BA", "Bosnia and Herzegovina", "387", 8, 9],
  ["BW", "Botswana", "267", 7, 8],
  ["BR", "Brazil", "55", 10, 11],
  ["BN", "Brunei", "673", 7, 7],
  ["BG", "Bulgaria", "359", 8, 9],
  ["BF", "Burkina Faso", "226", 8, 8],
  ["BI", "Burundi", "257", 8, 8],
  ["KH", "Cambodia", "855", 8, 9],
  ["CM", "Cameroon", "237", 8, 9],
  ["CA", "Canada", "1", 10, 10],
  ["CV", "Cape Verde", "238", 7, 7],
  ["CF", "Central African Republic", "236", 8, 8],
  ["TD", "Chad", "235", 8, 8],
  ["CL", "Chile", "56", 9, 9],
  ["CN", "China", "86", 10, 11],
  ["CO", "Colombia", "57", 10, 10],
  ["KM", "Comoros", "269", 7, 7],
  ["CG", "Congo", "242", 9, 9],
  ["CD", "Congo (DRC)", "243", 7, 9],
  ["CR", "Costa Rica", "506", 8, 8],
  ["CI", "Côte d'Ivoire", "225", 8, 10],
  ["HR", "Croatia", "385", 8, 9],
  ["CU", "Cuba", "53", 6, 8],
  ["CY", "Cyprus", "357", 8, 8],
  ["CZ", "Czechia", "420", 9, 9],
  ["DK", "Denmark", "45", 8, 8],
  ["DJ", "Djibouti", "253", 8, 8],
  ["DM", "Dominica", "1", 10, 10],
  ["DO", "Dominican Republic", "1", 10, 10],
  ["EC", "Ecuador", "593", 8, 9],
  ["EG", "Egypt", "20", 9, 10],
  ["SV", "El Salvador", "503", 8, 8],
  ["GQ", "Equatorial Guinea", "240", 9, 9],
  ["ER", "Eritrea", "291", 7, 7],
  ["EE", "Estonia", "372", 7, 8],
  ["SZ", "Eswatini", "268", 8, 8],
  ["ET", "Ethiopia", "251", 9, 9],
  ["FJ", "Fiji", "679", 7, 7],
  ["FI", "Finland", "358", 6, 11],
  ["FR", "France", "33", 9, 9],
  ["GA", "Gabon", "241", 7, 8],
  ["GM", "Gambia", "220", 7, 7],
  ["GE", "Georgia", "995", 9, 9],
  ["DE", "Germany", "49", 7, 13],
  ["GH", "Ghana", "233", 9, 9],
  ["GI", "Gibraltar", "350", 8, 8],
  ["GR", "Greece", "30", 10, 10],
  ["GD", "Grenada", "1", 10, 10],
  ["GT", "Guatemala", "502", 8, 8],
  ["GN", "Guinea", "224", 8, 9],
  ["GW", "Guinea-Bissau", "245", 7, 9],
  ["GY", "Guyana", "592", 7, 7],
  ["HT", "Haiti", "509", 8, 8],
  ["HN", "Honduras", "504", 8, 8],
  ["HK", "Hong Kong", "852", 8, 8],
  ["HU", "Hungary", "36", 8, 9],
  ["IS", "Iceland", "354", 7, 7],
  ["IN", "India", "91", 10, 10],
  ["ID", "Indonesia", "62", 9, 12],
  ["IR", "Iran", "98", 10, 10],
  ["IQ", "Iraq", "964", 8, 10],
  ["IE", "Ireland", "353", 7, 9],
  ["IL", "Israel", "972", 8, 9],
  ["IT", "Italy", "39", 6, 11],
  ["JM", "Jamaica", "1", 10, 10],
  ["JP", "Japan", "81", 9, 10],
  ["JO", "Jordan", "962", 8, 9],
  ["KZ", "Kazakhstan", "7", 10, 10],
  ["KE", "Kenya", "254", 9, 10],
  ["XK", "Kosovo", "383", 8, 9],
  ["KW", "Kuwait", "965", 8, 8],
  ["KG", "Kyrgyzstan", "996", 9, 9],
  ["LA", "Laos", "856", 8, 10],
  ["LV", "Latvia", "371", 8, 8],
  ["LB", "Lebanon", "961", 7, 8],
  ["LS", "Lesotho", "266", 8, 8],
  ["LR", "Liberia", "231", 7, 9],
  ["LY", "Libya", "218", 8, 9],
  ["LI", "Liechtenstein", "423", 7, 9],
  ["LT", "Lithuania", "370", 8, 8],
  ["LU", "Luxembourg", "352", 6, 11],
  ["MO", "Macau", "853", 8, 8],
  ["MG", "Madagascar", "261", 9, 9],
  ["MW", "Malawi", "265", 7, 9],
  ["MY", "Malaysia", "60", 8, 10],
  ["MV", "Maldives", "960", 7, 7],
  ["ML", "Mali", "223", 8, 8],
  ["MT", "Malta", "356", 8, 8],
  ["MR", "Mauritania", "222", 8, 8],
  ["MU", "Mauritius", "230", 7, 8],
  ["MX", "Mexico", "52", 10, 10],
  ["MD", "Moldova", "373", 8, 8],
  ["MC", "Monaco", "377", 8, 9],
  ["MN", "Mongolia", "976", 8, 8],
  ["ME", "Montenegro", "382", 8, 8],
  ["MA", "Morocco", "212", 9, 9],
  ["MZ", "Mozambique", "258", 8, 9],
  ["MM", "Myanmar", "95", 7, 10],
  ["NA", "Namibia", "264", 8, 9],
  ["NP", "Nepal", "977", 8, 10],
  ["NL", "Netherlands", "31", 9, 9],
  ["NZ", "New Zealand", "64", 8, 10],
  ["NI", "Nicaragua", "505", 8, 8],
  ["NE", "Niger", "227", 8, 8],
  ["NG", "Nigeria", "234", 8, 10],
  ["MK", "North Macedonia", "389", 8, 8],
  ["NO", "Norway", "47", 8, 8],
  ["OM", "Oman", "968", 8, 8],
  ["PK", "Pakistan", "92", 9, 10],
  ["PS", "Palestine", "970", 8, 9],
  ["PA", "Panama", "507", 7, 8],
  ["PG", "Papua New Guinea", "675", 7, 8],
  ["PY", "Paraguay", "595", 8, 9],
  ["PE", "Peru", "51", 8, 9],
  ["PH", "Philippines", "63", 8, 10],
  ["PL", "Poland", "48", 9, 9],
  ["PT", "Portugal", "351", 9, 9],
  ["PR", "Puerto Rico", "1", 10, 10],
  ["QA", "Qatar", "974", 8, 8],
  ["RO", "Romania", "40", 9, 9],
  ["RU", "Russia", "7", 10, 10],
  ["RW", "Rwanda", "250", 9, 9],
  ["KN", "Saint Kitts and Nevis", "1", 10, 10],
  ["LC", "Saint Lucia", "1", 10, 10],
  ["VC", "Saint Vincent and the Grenadines", "1", 10, 10],
  ["WS", "Samoa", "685", 5, 7],
  ["SM", "San Marino", "378", 6, 10],
  ["ST", "São Tomé and Príncipe", "239", 7, 7],
  ["SA", "Saudi Arabia", "966", 8, 9],
  ["SN", "Senegal", "221", 9, 9],
  ["RS", "Serbia", "381", 8, 10],
  ["SC", "Seychelles", "248", 7, 7],
  ["SL", "Sierra Leone", "232", 8, 8],
  ["SG", "Singapore", "65", 8, 8],
  ["SK", "Slovakia", "421", 9, 9],
  ["SI", "Slovenia", "386", 8, 8],
  ["SB", "Solomon Islands", "677", 5, 7],
  ["SO", "Somalia", "252", 7, 9],
  ["ZA", "South Africa", "27", 9, 9],
  ["KR", "South Korea", "82", 8, 10],
  ["SS", "South Sudan", "211", 9, 9],
  ["ES", "Spain", "34", 9, 9],
  ["LK", "Sri Lanka", "94", 9, 9],
  ["SD", "Sudan", "249", 9, 9],
  ["SR", "Suriname", "597", 6, 7],
  ["SE", "Sweden", "46", 7, 10],
  ["CH", "Switzerland", "41", 9, 9],
  ["SY", "Syria", "963", 8, 9],
  ["TW", "Taiwan", "886", 8, 9],
  ["TJ", "Tajikistan", "992", 9, 9],
  ["TZ", "Tanzania", "255", 9, 9],
  ["TH", "Thailand", "66", 8, 9],
  ["TL", "Timor-Leste", "670", 7, 8],
  ["TG", "Togo", "228", 8, 8],
  ["TO", "Tonga", "676", 5, 7],
  ["TT", "Trinidad and Tobago", "1", 10, 10],
  ["TN", "Tunisia", "216", 8, 8],
  ["TR", "Turkey", "90", 10, 10],
  ["TM", "Turkmenistan", "993", 8, 8],
  ["UG", "Uganda", "256", 9, 9],
  ["UA", "Ukraine", "380", 9, 9],
  ["AE", "United Arab Emirates", "971", 8, 9],
  ["GB", "United Kingdom", "44", 9, 10],
  ["US", "United States", "1", 10, 10],
  ["UY", "Uruguay", "598", 8, 8],
  ["UZ", "Uzbekistan", "998", 9, 9],
  ["VU", "Vanuatu", "678", 5, 7],
  ["VE", "Venezuela", "58", 10, 10],
  ["VN", "Vietnam", "84", 9, 10],
  ["YE", "Yemen", "967", 7, 9],
  ["ZM", "Zambia", "260", 9, 9],
  ["ZW", "Zimbabwe", "263", 8, 10],
];

export const PHONE_COUNTRIES: PhoneCountry[] = COUNTRY_DATA.map(([iso, name, dial, min, max]) => ({ iso, name, dial, min, max }));

/** Countries whose leading "0" is part of the number rather than a trunk prefix. */
const KEEPS_LEADING_ZERO = new Set(["IT", "SM", "CI", "BJ"]);

/** Dial codes longest first, to split "+447911123456" (no space) into "44" + "7911123456". */
const DIALS_LONGEST_FIRST = [...new Set(PHONE_COUNTRIES.map((c) => c.dial))].sort((a, b) => b.length - a.length);

export const phoneCountry = (iso: string) =>
  PHONE_COUNTRIES.find((c) => c.iso === iso) ?? PHONE_COUNTRIES.find((c) => c.iso === DEFAULT_PHONE_COUNTRY)!;

/** Flag image for the two-letter country code (emoji flags do not render on Windows). */
export const flagUrl = (iso: string, width: 20 | 40 | 80 = 40) => `https://flagcdn.com/w${width}/${iso.toLowerCase()}.png`;

/** "10 digits" or "9–10 digits": how long the number after the country code must be. */
export const digitsLabel = (country: PhoneCountry) =>
  `${country.min === country.max ? country.max : `${country.min}–${country.max}`} digits`;

/** Longest the national-number box may be (allows a typed trunk "0"). */
export const nationalMaxLength = (country: PhoneCountry) => country.max + (KEEPS_LEADING_ZERO.has(country.iso) ? 0 : 1);

/**
 * "+44 7911123456", "+44 7911 123 456" or "+447911123456" → { dial: "44", national: "7911123456" };
 * null when the value is not an international number.
 */
export function splitPhone(value: string) {
  const v = value.trim();
  if (!v.startsWith("+")) return null;
  const spaced = /^\+(\d{1,4})\s+([\d\s().-]*)$/.exec(v);
  if (spaced) return { dial: spaced[1], national: spaced[2].replace(/\D/g, "") };
  const compact = v.slice(1).replace(/[\s().-]/g, "");
  if (!/^\d+$/.test(compact)) return null;
  const dial = DIALS_LONGEST_FIRST.find((d) => compact.startsWith(d));
  return dial ? { dial, national: compact.slice(dial.length) } : null;
}

export const joinPhone = (country: PhoneCountry, national: string) => (national ? `+${country.dial} ${national}` : "");

/** Message for a "+<dial> <digits>" value, or "" when it is a valid number for that country. */
export function internationalPhoneError(value: string) {
  const parts = splitPhone(value);
  if (!parts) return "Phone number must contain numbers only.";
  const countries = PHONE_COUNTRIES.filter((c) => c.dial === parts.dial);
  if (!countries.length) return "Choose a valid country code.";
  const country = countries[0];
  const national = KEEPS_LEADING_ZERO.has(country.iso) ? parts.national : parts.national.replace(/^0/, "");
  if (national.length < country.min || national.length > country.max) {
    // Shared codes (+1, +7) have the same length for every country, so name the code, not a country.
    const where = countries.length > 1 ? `+${country.dial}` : country.name;
    return `Enter a valid ${where} phone number (${digitsLabel(country)} after +${country.dial}).`;
  }
  return "";
}
