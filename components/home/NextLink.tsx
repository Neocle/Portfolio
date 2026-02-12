import { HiArrowLongRight } from 'react-icons/hi2';
import '@/styles/components/home/NextLink.css';
import { useT } from '@/hooks/useT';
import TransitionLink from '@/components/common/TransitionLink';

const NextLink = () => {
  const { t } = useT();

  return (
    <TransitionLink href="/about" className="next-link" data-cursor="pointer">
        <div className="svg-container">
            <svg className="border-svg">
                <rect 
                    className="border-track"
                    x="0" y="0" 
                    width="100%" height="100%" 
                    rx="25" ry="25"
                    vectorEffect="non-scaling-stroke"
                />
                <rect 
                    className="border-outline"
                    x="0" y="0" 
                    width="100%" height="100%" 
                    rx="25" ry="25"
                    vectorEffect="non-scaling-stroke"
                />
            </svg>
        </div>
        
        <span className="text">{t("home.next-button")}</span>
        
        <div className="arrow-wrapper">
            <HiArrowLongRight />
        </div>
    </TransitionLink>
  );
};

export default NextLink;