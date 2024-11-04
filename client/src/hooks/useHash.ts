import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEventListener } from 'usehooks-ts';

const APP_BAR_HEIGHT = 80;

interface IProps {
  defaultHash: string;
  hashQuery: string;
  behavior?: ScrollBehavior;
}

export const useHash = ({
  defaultHash,
  hashQuery,
  behavior = 'smooth',
}: IProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToHash = (query: string) => {
    const element: HTMLElement = document.querySelector(query)!;
    const top = element.offsetTop - APP_BAR_HEIGHT;
    window.scrollTo({ top, behavior });
  };

  useEffect(() => {
    if (!location.hash) {
      return;
    }

    scrollToHash(location.hash);
  }, []);

  const [currentHash, setCurrentHash] = useState<string>(defaultHash);

  const onScroll = () => {
    const sections = document.querySelectorAll(hashQuery);

    const currentSection = _([...sections])
      .filter((section) => section.getBoundingClientRect().y >= 0)
      .minBy((section) => section.getBoundingClientRect().y);

    if (!currentSection || currentHash == currentSection.id) {
      return;
    }
    // make hash active in link
    setCurrentHash(currentSection.id);
  };

  useEventListener('scroll', onScroll);

  const onClickHash = (id: string) => {
    navigate({ hash: id }, { replace: true });

    scrollToHash(`#${id}`);
  };

  return { currentHash, onClickHash };
};
