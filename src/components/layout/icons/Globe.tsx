const Globe = ({ size = 24 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.0005 2.99585C8.82111 2.99585 3.00049 8.81648 3.00049 15.9959C3.00049 23.1752 8.82111 28.9959 16.0005 28.9959C23.1799 28.9959 29.0005 23.1752 29.0005 15.9959C29.0005 8.81648 23.1799 2.99585 16.0005 2.99585Z"
      stroke="white"
      strokeWidth="1.49989"
      strokeMiterlimit="10"
    />
    <path
      d="M15.9977 2.99585C12.3683 2.99585 8.95581 8.81648 8.95581 15.9959C8.95581 23.1752 12.3683 28.9959 15.9977 28.9959C19.6271 28.9959 23.0396 23.1752 23.0396 15.9959C23.0396 8.81648 19.6271 2.99585 15.9977 2.99585Z"
      stroke="white"
      strokeWidth="1.49989"
      strokeMiterlimit="10"
    />
    <path
      d="M7.33191 7.32874C9.72191 9.02561 12.7307 10.0375 15.9988 10.0375C19.2669 10.0375 22.2757 9.02561 24.6657 7.32874"
      stroke="white"
      strokeWidth="1.49989"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M24.6657 24.6625C22.2757 22.9657 19.2669 21.9538 15.9988 21.9538C12.7307 21.9538 9.72191 22.9657 7.33191 24.6625"
      stroke="white"
      strokeWidth="1.49989"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15.9998 2.99585V28.9959"
      stroke="white"
      strokeWidth="1.49989"
      strokeMiterlimit="10"
    />
    <path
      d="M29.0005 15.9958H3.00049"
      stroke="white"
      strokeWidth="1.49989"
      strokeMiterlimit="10"
    />
  </svg>
);

export default Globe;
