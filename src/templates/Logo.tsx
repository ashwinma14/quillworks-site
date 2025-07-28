import { AppConfig } from '../utils/AppConfig';

type ILogoProps = {
  xl?: boolean;
};

const Logo = (props: ILogoProps) => {
  const fontStyle = props.xl
    ? 'font-serif font-semibold text-3xl'
    : 'font-serif font-semibold text-[18px]';

  return (
    <span className={`text-primary ${fontStyle}`}>
      {/* SVG logo commented out for plain text branding */}
      {/* <svg
        className="mr-1 stroke-current text-primary"
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M0 0h24v24H0z" stroke="none" />
        <rect x="3" y="12" width="6" height="8" rx="1" />
        <rect x="9" y="8" width="6" height="12" rx="1" />
        <rect x="15" y="4" width="6" height="16" rx="1" />
        <path d="M4 20h14" />
      </svg> */}

      {AppConfig.site_name}
    </span>
  );
};

export { Logo };
