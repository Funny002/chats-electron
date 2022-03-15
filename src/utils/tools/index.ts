/** 不考虑兼容 IE */
export interface PlatformConfig {
  version: string;
  language: string;
  platform: 'Window' | 'Linux' | 'Mac' | 'Other',
  browser: 'Edge' | 'Chrome' | 'Safari' | 'Firefox' | 'Other';
}

export const Platform = (navigator => {
  const userAgent = navigator.userAgent;
  const getPlatform = (): PlatformConfig['platform'] => {
    if (/Window/.test(userAgent)) return 'Window';
    if (/Linux/.test(userAgent)) return 'Linux';
    if (/Mac/.test(userAgent)) return 'Mac';
    return 'Other';
  };
  const getBrowser = (): string => {
    for (const item of ['Edge?', 'Firefox', 'Safari', 'Chrome']) {
      const reg = new RegExp(`${item}\\/\\d+(\.\\d+)?`);
      if (reg.test(userAgent)) return (userAgent.match(reg) || [])[0];
    }
    return 'Other/';
  };
  const browserInfo = getBrowser().split('/') as [PlatformConfig['browser'] | 'Edg', string];
  return {
    platform: getPlatform(),
    version: browserInfo[1],
    language: navigator.language,
    browser: browserInfo[0] === 'Edg' ? 'Edge' : browserInfo[0],
  } as PlatformConfig;
})(window.navigator);