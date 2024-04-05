import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
const availableLocales = ['az', 'en', 'ru'];

const mapLocaleToDisplayName = (locale: string): string => {
  switch (locale) {
    case 'az':
      return 'AZ';
    case 'en':
      return 'EN';
    case 'ru':
      return 'RU';
    default:
      return locale;
  }
};

interface LanguagesProps {
  color: string;
}

const Languages: React.FC<LanguagesProps> = ({ color }) => {
  const { locale } = useRouter();
  const currentLocale = locale || 'en'; // Default language is 'en-US'
  const [lengtoggle, setLengtoggle] = useState(false);
  const router = useRouter();
  const { seo, id } = router.query;
  const a= router.pathname;

  const parts = a.split('/');
  const rout = parts[1];
  // Update the language toggle when the language changes
  useEffect(() => {
    setLengtoggle(false); // Close the language menu when the language changes
  }, [currentLocale]);

  // Close the language menu when the page is scrolled
  useEffect(() => {
    const handleScroll = () => {
      setLengtoggle(false);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleDivClick = () => {
    setLengtoggle(!lengtoggle);
  };
  return (
    <div className="cursor-pointer max-w-[54px] flex flex-col justify-center items-start gap-[5px] relative left-0 top-0 ">
      <button onClick={handleDivClick} className="cursor-pointer flex items-center gap-[5px]  ">
        <span className=' text-sm font-bold ' style={{ color: color }} >{mapLocaleToDisplayName(currentLocale)}</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
          <path d="M8.9325 12.9413L14.5575 18.5663C14.6747 18.6834 14.8337 18.7493 14.9994 18.7493C15.1651 18.7493 15.324 18.6834 15.4413 18.5663L21.0663 12.9413C21.1801 12.8234 21.2431 12.6655 21.2417 12.5017C21.2403 12.3378 21.1745 12.181 21.0586 12.0651C20.9428 11.9493 20.786 11.8835 20.6221 11.8821C20.4583 11.8807 20.3004 11.9437 20.1825 12.0575L15 17.2413L9.8175 12.0575C9.75964 11.9992 9.6908 11.9529 9.61496 11.9213C9.53912 11.8898 9.45778 11.8735 9.37563 11.8735C9.29348 11.8735 9.21213 11.8898 9.1363 11.9213C9.06046 11.9529 8.99162 11.9992 8.93375 12.0575C8.81658 12.1747 8.75076 12.3337 8.75076 12.4994C8.75076 12.6651 8.81534 12.8241 8.9325 12.9413Z" fill={color} />
        </svg>
      </button>

      <div className={`${lengtoggle ? 'opacity-100 visible' : 'opacity-0 invisible'} flex py-[5px] flex-col justify-center items-start  absolute z-10 top-[20px] left-0 `}>
        {availableLocales
          .filter((availableLocale) => availableLocale !== currentLocale)
          .sort()
          .map((filteredLocale) => (
            <div key={filteredLocale} className="mr-3">
              <Link
                style={{ color: color }}
                className={`${lengtoggle ? 'opacity-100 visible' : 'opacity-0 invisible'} text-sm font-bold cursor-pointer block`}
                href={`/${filteredLocale}${rout ? `/${rout}` : ''}${seo ? `/${seo}` : ''}${id ? `/${id}` : ''}`}
                locale={filteredLocale}
              >
                {mapLocaleToDisplayName(filteredLocale)}
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Languages;
