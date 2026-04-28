'use client';

import { useId } from 'react';

type SVGProps = { className?: string };

export const CloackBlurred = ({ className }: SVGProps) => {
  const id = useId();
  return (
    <svg width="172" height="172" viewBox="0 0 172 172" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <pattern id={`${id}p`} patternUnits="objectBoundingBox" patternContentUnits="objectBoundingBox" width="1" height="1">
          <image href="/images/benefits/o-shape-bg.png" x="0" y="0" width="1" height="1" preserveAspectRatio="none"/>
        </pattern>
        <filter id={`${id}f`} x="0" y="0" width="172" height="172" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dx="4" dy="16"/>
          <feGaussianBlur stdDeviation="2"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0.168627 0 0 0 0 0.160784 0 0 0 0 0.160784 0 0 0 0.04 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dx="4" dy="11"/>
          <feGaussianBlur stdDeviation="5.5"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"/>
          <feBlend mode="normal" in2="effect1_dropShadow" result="effect2_dropShadow"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow" result="shape"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dy="5"/>
          <feGaussianBlur stdDeviation="4.7"/>
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
          <feBlend mode="normal" in2="shape" result="effect3_innerShadow"/>
        </filter>
      </defs>
      <circle cx="82" cy="75" r="75" fill={`url(#${id}p)`} />
      <g filter={`url(#${id}f)`}>
        <circle cx="82" cy="75" r="75" fill="white" fillOpacity="0.01" shapeRendering="crispEdges"/>
      </g>
      <path d="M82.1641 137C116.13 137 143.664 109.466 143.664 75.5C143.664 41.5345 116.13 14 82.1641 14C48.1985 14 20.6641 41.5345 20.6641 75.5C20.6641 109.466 48.1985 137 82.1641 137Z" stroke="#2B2929" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M82.6641 34C82.6641 50.6949 82.6641 60.0551 82.6641 76.75L53.6641 91" stroke="#2B2929" strokeWidth="7" strokeLinejoin="round" />
    </svg>
  );
};

export const ThunderSVG = ({ className }: SVGProps) => (
  <svg width="56" height="95" viewBox="0 0 56 95" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M0 54.0087L40.6766 0L30.9254 40.9913H56L14.4876 95L24.796 54.0087H0Z" fill="#2B2929" />
  </svg>
);

export const ZeroBlurred = ({ className }: SVGProps) => {
  const id = useId();
  const shape =
    'M67.7664 145.865C55.7833 145.497 45.1309 142.384 35.8093 136.526C26.4913 130.536 19.2632 122.09 14.1249 111.187C8.98658 100.284 6.62748 87.2117 7.04759 71.9695C7.4677 56.7274 10.5428 43.8219 16.2729 33.253C22.0031 22.6841 29.6824 14.7619 39.3108 9.48625C48.943 4.07806 59.7506 1.55802 71.7338 1.92613C83.8562 2.29851 94.5068 5.47772 103.685 11.4637C113.007 17.3215 120.237 25.7017 125.375 36.6045C130.514 47.5072 132.873 60.5796 132.453 75.8218C132.032 91.064 128.957 103.969 123.227 114.538C117.497 125.107 109.816 133.096 100.184 138.504C90.6947 143.784 79.8889 146.238 67.7664 145.865Z';
  return (
    <svg width="148" height="168" viewBox="0 0 148 168" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <pattern id={`${id}p`} patternUnits="objectBoundingBox" patternContentUnits="objectBoundingBox" width="1" height="1">
          <image href="/images/benefits/arc-bg.png" x="0" y="0" width="1" height="1.1" preserveAspectRatio="none"/>
        </pattern>
        <filter id={`${id}f`} x="0" y="0" width="148" height="168" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dx="4" dy="16"/>
          <feGaussianBlur stdDeviation="2"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0.168627 0 0 0 0 0.160784 0 0 0 0 0.160784 0 0 0 0.04 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dx="4" dy="11"/>
          <feGaussianBlur stdDeviation="3.5"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"/>
          <feBlend mode="normal" in2="effect1_dropShadow" result="effect2_dropShadow"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow" result="shape"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dy="5"/>
          <feGaussianBlur stdDeviation="3.5"/>
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
          <feBlend mode="normal" in2="shape" result="effect3_innerShadow"/>
        </filter>
      </defs>
      <path d={shape} fill={`url(#${id}p)`} />
      <g filter={`url(#${id}f)`}>
        <path d={shape} fill="white" fillOpacity="0.01" shapeRendering="crispEdges"/>
      </g>
      <path fillRule="evenodd" clipRule="evenodd" d="M53.2351 35.2222C58.9171 32.0319 65.2933 30.5451 72.3621 30.7622C79.5128 30.9819 85.7955 32.8572 91.2097 36.3882C96.7085 39.8436 100.974 44.7878 104.005 51.2192C107.036 57.6506 108.427 65.362 108.179 74.353C107.932 83.3442 106.117 90.9574 102.737 97.1919C99.357 103.426 94.8261 108.138 89.1443 111.329C83.5467 114.443 77.1722 115.891 70.0213 115.671C62.9525 115.454 56.6684 113.618 51.1697 110.163C45.6731 106.629 41.4097 101.646 38.3787 95.2144C35.3476 88.7829 33.9561 81.0718 34.2039 72.0806C34.4517 63.0893 36.2651 55.4762 39.6453 49.2417C43.0254 43.0073 47.5555 38.3342 53.2351 35.2222ZM71.9207 39.1577C67.2651 39.0147 63.1001 40.059 59.4275 42.2915C55.8713 44.5276 52.9754 48.1611 50.74 53.1909C48.6211 58.2243 47.4511 64.7654 47.2293 72.814C47.0074 80.8627 47.8159 87.4647 49.6541 92.6196C51.6087 97.7782 54.2993 101.583 57.7263 104.034C61.2698 106.488 65.3696 107.786 70.0252 107.929C74.7969 108.076 78.9612 107.031 82.5173 104.795C86.1899 102.563 89.0859 98.9293 91.2048 93.896C93.4401 88.8662 94.6686 82.3265 94.8904 74.2778C95.1122 66.2292 94.2453 59.6258 92.2908 54.4673C90.4526 49.3123 87.762 45.5074 84.2185 43.0532C80.7916 40.6028 76.6923 39.3044 71.9207 39.1577Z" fill="#2B2929" />
    </svg>
  );
};

export const DollarSVG = ({ className }: SVGProps) => (
  <svg
    className={className}
    width="72"
    height="94"
    viewBox="0 0 72 94"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M47.8124 93.6893L28.7362 93.9705L28.6702 83.8478C11.5435 82.1617 1.35389 74.3421 1.25057 58.5118L1.24635 57.8657L21.7396 57.5636L21.7543 59.8251C21.7859 64.6711 23.5385 65.9376 37.2733 65.7352C49.7 65.552 51.0018 64.5635 50.9807 61.3329C50.9638 58.7483 49.5397 57.6923 43.5394 57.0269L20.6284 54.349C6.99065 52.7192 0.0761566 45.6052 0.000245294 33.9748C-0.0679345 23.529 7.27351 12.5432 28.1901 10.2963L28.1247 0.28119L47.2008 5.20072e-06L47.2711 10.7689C62.3337 13.5625 69.6962 22.5007 69.7812 35.531L69.7854 36.1772L49.2922 36.4792L49.2817 34.8639C49.248 29.6948 46.9476 28.0055 33.2128 28.208C22.7481 28.3622 20.4681 29.796 20.4885 32.9189C20.5033 35.1804 21.8184 36.238 25.7461 36.7186L48.6593 39.7195C66.5532 42.0406 71.4085 51.0157 71.469 60.277C71.5372 70.7228 64.7316 80.3007 47.7442 83.2435L47.8124 93.6893Z"
      fill="#2B2929"
    />
  </svg>
);

export const PhoneBlurred = ({ className }: SVGProps) => {
  const id = useId();
  return (
    <svg width="111" height="190" viewBox="0 0 111 190" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <pattern id={`${id}p`} patternUnits="objectBoundingBox" patternContentUnits="objectBoundingBox" width="1" height="1">
          <image href="/images/benefits/square-bg.png" x="0" y="0" width="1" height="1" preserveAspectRatio="none"/>
        </pattern>
        <filter id={`${id}f`} x="0" y="0" width="111" height="190" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dx="4" dy="16"/>
          <feGaussianBlur stdDeviation="2"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0.168627 0 0 0 0 0.160784 0 0 0 0 0.160784 0 0 0 0.04 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dx="4" dy="11"/>
          <feGaussianBlur stdDeviation="5.5"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"/>
          <feBlend mode="normal" in2="effect1_dropShadow" result="effect2_dropShadow"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow" result="shape"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dy="5"/>
          <feGaussianBlur stdDeviation="4.7"/>
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
          <feBlend mode="normal" in2="shape" result="effect3_innerShadow"/>
        </filter>
      </defs>
      <rect x="7" y="0" width="88.5534" height="167.112" rx="10" fill={`url(#${id}p)`} />
      <g filter={`url(#${id}f)`}>
        <rect x="7" y="0" width="88.5534" height="167.112" rx="10" fill="white" fillOpacity="0.01" shapeRendering="crispEdges"/>
      </g>
      <circle cx="50.7476" cy="9.49369" r="3.20072" fill="#2B2929" />
      <path d="M50.7464 143.213C50.2748 143.213 49.8225 143.401 49.489 143.734C49.1555 144.067 48.9682 144.52 48.9682 144.991C48.9682 145.898 48.8793 147.223 48.737 148.548M52.5246 145.987C52.5246 148.103 52.5246 151.66 51.6355 153.882M55.4497 153.011C55.5563 152.478 55.832 150.966 55.8942 150.326M41.8555 144.991C41.8555 143.125 42.4426 141.307 43.5337 139.793C44.6248 138.279 46.1645 137.147 47.9348 136.557C49.7051 135.967 51.6162 135.948 53.3973 136.505C55.1785 137.061 56.7395 138.164 57.8591 139.657M41.8555 148.548H41.8644M59.4595 148.548C59.6373 146.77 59.5759 143.788 59.4595 143.213M44.5227 151.66C44.9673 150.326 45.4118 147.659 45.4118 144.991C45.4109 144.386 45.5132 143.784 45.7141 143.213M47.7679 153.882C47.9546 153.295 48.168 152.709 48.2747 152.104M48.0791 140.368C48.8903 139.9 49.8105 139.653 50.7472 139.653C51.6839 139.654 52.6041 139.9 53.4151 140.369C54.2262 140.838 54.8995 141.511 55.3675 142.323C55.8355 143.134 56.0815 144.055 56.0809 144.991V146.77" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export const TvSVG = ({ className }: SVGProps) => (
  <svg
    width="105"
    height="96"
    viewBox="0 0 105 96"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}>
    <path
      d="M89.4707 27.4037C93.2808 27.4038 96.8813 28.6781 99.6035 30.9282C102.348 33.197 104.277 36.5539 104.277 40.4653V82.8969C104.277 86.8083 102.348 90.1652 99.6035 92.434C96.8813 94.6841 93.2808 95.9584 89.4707 95.9584H14.8066C10.9967 95.9584 7.39678 94.6835 4.6748 92.434H4.67383C1.92903 90.1652 8.15237e-05 86.8083 0 82.8969V40.4653C3.11996e-05 36.5538 1.92899 33.197 4.67383 30.9282H4.6748C7.39678 28.6786 10.9966 27.4037 14.8066 27.4037H89.4707ZM14.8066 34.4037C12.5347 34.4037 10.5336 35.1668 9.13379 36.3237C7.73532 37.4796 7.00003 38.9592 7 40.4653V82.8969C7.00008 84.4029 7.73537 85.8826 9.13379 87.0385C10.5336 88.1953 12.5347 88.9584 14.8066 88.9584H89.4707C91.7428 88.9584 93.7437 88.1955 95.1436 87.0385C96.542 85.8826 97.2773 84.4029 97.2773 82.8969V40.4653C97.2773 38.9592 96.542 37.4796 95.1436 36.3237C93.7437 35.1667 91.7428 34.4038 89.4707 34.4037H14.8066ZM87.3584 0.442803C88.3851 -0.280396 89.899 -0.098299 90.7402 0.849053C91.5812 1.79651 91.4308 3.15101 90.4043 3.87444L60.168 25.183H45.9609L14.0928 3.87444C13.0112 3.15101 12.7581 1.79642 13.5264 0.849053C14.2953 -0.0983962 15.7959 -0.280656 16.8779 0.442803L53.042 24.6235L87.3584 0.442803Z"
      fill="#2B2929"
    />
  </svg>
);

export const LaptopSVG = ({ className }: SVGProps) => (
  <svg
    width="138"
    height="131"
    viewBox="0 0 138 131"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}>
    <path
      d="M107.773 13.2565C107.858 10.0424 105.38 7.37414 102.24 7.29759L14.2785 5.3267C11.1507 5.26279 8.62705 7.89669 8.64093 11.2089L8.8129 69.1119C8.81867 72.4161 11.3049 75.0928 14.3668 75.0913L100.479 75.2277C103.553 75.2388 106.122 72.6495 106.215 69.4434L107.773 13.2565Z"
      stroke="#2B2929"
      strokeWidth="5"
    />
    <path
      d="M15.4562 118.582C15.7776 120.448 18.7607 121.675 22.1182 121.321L123.703 112.778C127.045 112.419 129.397 110.578 128.958 108.668L110.793 86.5009C110.364 84.5942 107.37 83.3639 104.107 83.7528L16.4733 83.587C13.1945 83.9702 10.7884 85.7906 11.1002 87.6533L15.4562 118.582Z"
      stroke="#2B2929"
      strokeWidth="5"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M104.096 88.9901L20.5112 91.0884L20.3171 91.0973C19.3665 91.1752 18.8525 91.7116 19.1591 92.3488L21.2661 105.397L21.3393 105.523C21.7203 106.098 22.7065 106.54 23.691 106.575L23.9 106.577L113.132 101.098L113.33 101.089C114.277 101.011 114.647 100.506 114.153 99.9102L106.929 90.1258C106.441 89.5289 105.296 89.0444 104.295 88.9941L104.096 88.9901Z"
      fill="#2B2929"
    />
  </svg>
);
export const InfiniteBlurred = ({ className }: SVGProps) => {
  const id = useId();
  const shape =
    'M227.875 109.185C229.373 102.636 228.344 95.7277 225.016 89.9792C221.689 84.2307 216.334 80.1126 210.13 78.5316C202.384 76.5578 194.323 77.8054 184.418 82.4989C178.496 85.3047 172.531 89.0316 166.161 93.4583C169.916 100.465 173.614 106.654 177.67 112.003C184.456 120.95 191.09 125.942 198.836 127.916C205.04 129.496 211.584 128.412 217.03 124.899C222.476 121.386 226.378 115.733 227.875 109.185ZM49.6714 63.774C48.1737 70.3227 49.2022 77.2318 52.5301 82.9804C55.858 88.7287 61.2128 92.846 67.4166 94.427C75.1624 96.4008 83.2225 95.1528 93.128 90.4594C99.0493 87.6538 105.014 83.9263 111.384 79.4998C107.629 72.4932 103.932 66.3037 99.8757 60.9556C93.0898 52.0089 86.4568 47.0167 78.7111 45.0429C72.507 43.462 65.9625 44.5479 60.5165 48.0606C55.0705 51.5734 51.1692 57.2253 49.6714 63.774ZM268.702 119.588C264.591 137.567 253.881 153.085 238.93 162.728C223.979 172.372 206.011 175.351 188.98 171.011C169.346 166.008 155.351 153.51 144.884 139.71C139.889 133.125 135.447 125.891 131.421 118.624C124.698 123.152 117.619 127.45 110.329 130.904C95.0498 138.144 77.1935 142.525 57.5605 137.522C40.5284 133.182 25.827 121.878 16.6909 106.096C7.55493 90.3148 4.73252 71.3485 8.84427 53.3702C12.9561 35.3919 23.6652 19.8738 38.6161 10.2302C53.5671 0.586551 71.5352 -2.39257 88.5673 1.94758C108.2 6.95054 122.196 19.4486 132.663 33.2486C137.657 39.8332 142.099 47.0668 146.125 54.333C152.848 49.8058 159.928 45.5084 167.218 42.0541C182.497 34.8147 200.353 30.4333 219.986 35.4363C237.018 39.7765 251.719 51.0807 260.855 66.8619C269.991 82.6435 272.814 101.61 268.702 119.588Z';
  return (
    <svg width="286" height="195" viewBox="0 0 286 195" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <pattern id={`${id}p`} patternUnits="objectBoundingBox" patternContentUnits="objectBoundingBox" width="1" height="1">
          <image href="/images/benefits/ellipse-bg.png" x="0" y="0" width="1" height="1" preserveAspectRatio="none"/>
        </pattern>
        <filter id={`${id}f`} x="0" y="0" width="286" height="195" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dx="4" dy="16"/>
          <feGaussianBlur stdDeviation="1"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0.168627 0 0 0 0 0.160784 0 0 0 0 0.160784 0 0 0 0.04 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dx="4" dy="11"/>
          <feGaussianBlur stdDeviation="3"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"/>
          <feBlend mode="normal" in2="effect1_dropShadow" result="effect2_dropShadow"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow" result="shape"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dy="5"/>
          <feGaussianBlur stdDeviation="3.2"/>
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
          <feBlend mode="normal" in2="shape" result="effect3_innerShadow"/>
        </filter>
      </defs>
      <path d={shape} fill={`url(#${id}p)`} />
      <g filter={`url(#${id}f)`}>
        <path d={shape} fill="white" fillOpacity="0.01" shapeRendering="crispEdges"/>
      </g>
    </svg>
  );
};
export const RocketSVG = ({ className }: SVGProps) => (
  <svg width="68" height="72" viewBox="0 0 68 72" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M29.0477 17.9297C25.8034 23.568 23.1016 29.5423 20.9834 35.7618L0 36.1525C0 36.1525 2.05571 22.5506 8.06008 18.0966C14.7687 13.1371 29.0477 17.9297 29.0477 17.9297Z" fill="#2B2929" />
    <path d="M33.8235 48.9521C39.6407 46.4643 45.2085 43.3613 50.4436 39.6897C50.4436 39.6897 55.2576 54.7305 50.8602 62.0643C46.9102 68.6287 34.2401 71.3266 34.2401 71.3266L33.8235 48.9521Z" fill="#2B2929" />
    <path d="M67.5693 0.000917613C67.5693 10.0725 64.8065 27.7718 46.3193 40.7314C41.8453 43.6878 37.099 46.1684 32.1523 48.1367L21.5273 37.0283C23.412 31.9164 25.7849 27.0161 28.6104 22.4023C32.737 15.504 38.4837 9.82434 45.3027 5.90326C52.1217 1.98224 59.7872 -0.0495468 67.5693 0.000917613Z" fill="#2B2929" />
  </svg>
);
