import clsx from 'clsx';

function CommonPageCardedHeader(props) {
  return (
    <div className={clsx('CommonPageCarded-header', 'container')}>{props.header && props.header}</div>
  );
}

export default CommonPageCardedHeader;
