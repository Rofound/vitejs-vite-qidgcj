// eslint-disable-next-line import/prefer-default-export
export function hasMobile() {
  let isMobile = false;
  if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
    // console.log('移动端');
    isMobile = true;
  }
  if (document.body.clientWidth < 768) {
    isMobile = true;
  }
  return isMobile;
}
