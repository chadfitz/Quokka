import { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

function ResetScroll({ history }) {
  useEffect(() => {
    const callback = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      callback();
    }
  }, []);
  return null;
}

export default withRouter(ResetScroll);