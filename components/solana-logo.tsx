interface SolanaLogoProps {
  className?: string
}

export function SolanaLogo({ className = "" }: SolanaLogoProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 397 311"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0_1064_606)">
        <path
          d="M64.6582 237.956C67.9174 234.697 72.3515 232.857 76.9571 232.857H395.234C402.598 232.857 406.28 241.975 401.135 247.12L336.334 311.921C333.075 315.18 328.641 317.02 324.035 317.02H5.75881C-1.60519 317.02 -5.28696 307.902 -0.141689 302.757L64.6582 237.956Z"
          fill="url(#paint0_linear_1064_606)"
        />
        <path
          d="M64.6582 5.75881C67.9174 2.49988 72.3515 0.659912 76.9571 0.659912H395.234C402.598 0.659912 406.28 9.77816 401.135 14.9234L336.334 79.7244C333.075 82.9833 328.641 84.8232 324.035 84.8232H5.75881C-1.60519 84.8232 -5.28696 75.7049 -0.141689 70.5597L64.6582 5.75881Z"
          fill="url(#paint1_linear_1064_606)"
        />
        <path
          d="M336.334 121.472C333.075 118.213 328.641 116.373 324.035 116.373H5.75881C-1.60519 116.373 -5.28696 125.491 -0.141689 130.636L64.6582 195.437C67.9174 198.696 72.3515 200.536 76.9571 200.536H395.234C402.598 200.536 406.28 191.418 401.135 186.273L336.334 121.472Z"
          fill="url(#paint2_linear_1064_606)"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_1064_606"
          x1="360.879"
          y1="260.67"
          x2="141.913"
          y2="221.421"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00FFA3" />
          <stop offset="1" stopColor="#DC1FFF" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_1064_606"
          x1="264.83"
          y1="42.9372"
          x2="98.5356"
          y2="198.251"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00FFA3" />
          <stop offset="1" stopColor="#DC1FFF" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_1064_606"
          x1="312.548"
          y1="152.952"
          x2="129.452"
          y2="196.387"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00FFA3" />
          <stop offset="1" stopColor="#DC1FFF" />
        </linearGradient>
        <clipPath id="clip0_1064_606">
          <rect width="397" height="311" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}
