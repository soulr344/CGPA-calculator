import { SVGProps } from "react";

export default function CaretSVG(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_6_86)">
        <path
          d="M29.52 22.52L18 10.6L6.48004 22.52C6.16708 22.8449 5.99601 23.2808 6.00445 23.7318C6.01289 24.1828 6.20015 24.612 6.52504 24.925C6.84993 25.238 7.28583 25.409 7.73686 25.4006C8.18788 25.3922 8.61708 25.2049 8.93004 24.88L18 15.49L27.08 24.88C27.393 25.2049 27.8222 25.3922 28.2732 25.4006C28.7242 25.409 29.1602 25.238 29.485 24.925C29.8099 24.612 29.9972 24.1828 30.0056 23.7318C30.0141 23.2808 29.843 22.8449 29.53 22.52H29.52Z"
          fill="currentcolor"
        />
      </g>
      <defs>
        <clipPath id="clip0_6_86">
          <rect width="36" height="36" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
