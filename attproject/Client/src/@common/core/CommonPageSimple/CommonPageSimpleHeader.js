import clsx from 'clsx';

function CommonPageSimpleHeader(props) {
  return (
    <div className={clsx('CommonPageSimple-header', props.className)}>
      <div className="container">{props.header && props.header}</div>
    </div>
  );
}

export default CommonPageSimpleHeader;
