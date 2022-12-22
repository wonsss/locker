import NewName from './NewName';
import OldName from './OldName';

import { useRadioOption } from 'hooks/useRadioOption';

import { Title, Radio, Spacing, ProgressBar } from 'components';

const NamePage = () => {
  const { option, handleChangeRadio } = useRadioOption('name');

  return (
    <>
      <ProgressBar now={1} total={3} />
      <Title linkTo="/">{`배정 대상`}</Title>
      <Radio value={option} onChange={handleChangeRadio}>
        <Radio.Option value="새로 입력">새로 입력</Radio.Option>
        <Radio.Option value="불러오기">불러오기</Radio.Option>
      </Radio>
      <Spacing size={20} />
      {option === '새로 입력' ? <NewName /> : <OldName />}
    </>
  );
};

export default NamePage;
