import{R as N,S as T,T as D,U as g}from"./index-A8VWN7nB.js";function b(t,e){var r;N(1,arguments);var a=T((r=e==null?void 0:e.additionalDigits)!==null&&r!==void 0?r:2);if(a!==2&&a!==1&&a!==0)throw new RangeError("additionalDigits must be 0, 1 or 2");if(!(typeof t=="string"||Object.prototype.toString.call(t)==="[object String]"))return new Date(NaN);var n=C(t),i;if(n.date){var f=I(n.date,a);i=x(f.restDateString,f.year)}if(!i||isNaN(i.getTime()))return new Date(NaN);var o=i.getTime(),u=0,l;if(n.time&&(u=S(n.time),isNaN(u)))return new Date(NaN);if(n.timezone){if(l=z(n.timezone),isNaN(l))return new Date(NaN)}else{var s=new Date(o+u),m=new Date(0);return m.setFullYear(s.getUTCFullYear(),s.getUTCMonth(),s.getUTCDate()),m.setHours(s.getUTCHours(),s.getUTCMinutes(),s.getUTCSeconds(),s.getUTCMilliseconds()),m}return new Date(o+u+l)}var d={dateTimeDelimiter:/[T ]/,timeZoneDelimiter:/[Z ]/i,timezone:/([Z+-].*)$/},w=/^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/,U=/^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/,h=/^([+-])(\d{2})(?::?(\d{2}))?$/;function C(t){var e={},r=t.split(d.dateTimeDelimiter),a;if(r.length>2)return e;if(/:/.test(r[0])?a=r[0]:(e.date=r[0],a=r[1],d.timeZoneDelimiter.test(e.date)&&(e.date=t.split(d.timeZoneDelimiter)[0],a=t.substr(e.date.length,t.length))),a){var n=d.timezone.exec(a);n?(e.time=a.replace(n[1],""),e.timezone=n[1]):e.time=a}return e}function I(t,e){var r=new RegExp("^(?:(\\d{4}|[+-]\\d{"+(4+e)+"})|(\\d{2}|[+-]\\d{"+(2+e)+"})$)"),a=t.match(r);if(!a)return{year:NaN,restDateString:""};var n=a[1]?parseInt(a[1]):null,i=a[2]?parseInt(a[2]):null;return{year:i===null?n:i*100,restDateString:t.slice((a[1]||a[2]).length)}}function x(t,e){if(e===null)return new Date(NaN);var r=t.match(w);if(!r)return new Date(NaN);var a=!!r[4],n=v(r[1]),i=v(r[2])-1,f=v(r[3]),o=v(r[4]),u=v(r[5])-1;if(a)return $(e,o,u)?O(e,o,u):new Date(NaN);var l=new Date(0);return!M(e,i,f)||!Z(e,n)?new Date(NaN):(l.setUTCFullYear(e,i,Math.max(n,f)),l)}function v(t){return t?parseInt(t):1}function S(t){var e=t.match(U);if(!e)return NaN;var r=c(e[1]),a=c(e[2]),n=c(e[3]);return F(r,a,n)?r*D+a*g+n*1e3:NaN}function c(t){return t&&parseFloat(t.replace(",","."))||0}function z(t){if(t==="Z")return 0;var e=t.match(h);if(!e)return 0;var r=e[1]==="+"?-1:1,a=parseInt(e[2]),n=e[3]&&parseInt(e[3])||0;return R(a,n)?r*(a*D+n*g):NaN}function O(t,e,r){var a=new Date(0);a.setUTCFullYear(t,0,4);var n=a.getUTCDay()||7,i=(e-1)*7+r+1-n;return a.setUTCDate(a.getUTCDate()+i),a}var Y=[31,null,31,30,31,30,31,31,30,31,30,31];function p(t){return t%400===0||t%4===0&&t%100!==0}function M(t,e,r){return e>=0&&e<=11&&r>=1&&r<=(Y[e]||(p(t)?29:28))}function Z(t,e){return e>=1&&e<=(p(t)?366:365)}function $(t,e,r){return e>=1&&e<=53&&r>=0&&r<=6}function F(t,e,r){return t===24?e===0&&r===0:r>=0&&r<60&&e>=0&&e<60&&t>=0&&t<25}function R(t,e){return e>=0&&e<=59}export{b as p};