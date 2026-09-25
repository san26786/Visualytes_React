/**
 * Images picked in the admin can be a site path (/uploads/…, /assets/…) or a full web address.
 * next/image only optimises addresses on its allow-list, so any other full address is shown as-is
 * instead of crashing the page.
 */
export const isRemoteImage = (src: string) => /^https?:\/\//i.test(src);
