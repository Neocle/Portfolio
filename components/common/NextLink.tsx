import { HiArrowLongRight } from 'react-icons/hi2';
import '@/styles/components/common/NextLink.css';
import { useT } from '@/hooks/useT';
import TransitionLink from '@/components/common/TransitionLink';

interface NextLinkProps {
  pathname?: string;
  labelKey?: string;
}

const NextLink = ({ 
  pathname = "/about",
  labelKey = "home.next-button"
}: NextLinkProps) => {
  const { t } = useT();

  return (
    <TransitionLink href={pathname} className="next-link" data-cursor="pointer">
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
        
        <span className="text">{t(labelKey)}</span>
        
        <div className="arrow-wrapper">
            <HiArrowLongRight />
        </div>
    </TransitionLink>
  );
};

export default NextLink;