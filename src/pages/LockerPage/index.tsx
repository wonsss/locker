import NewLocker from './NewLocker';
import OldLocker from './OldLocker';

import { useRadioOption } from 'hooks/useRadioOption';

import { Title, Radio, Spacing } from 'components';

const LockerPage = () => {
  const { option, handleChangeRadio } = useRadioOption('locker');

  return (
    <>
      <Title linkTo="/name">{`사물함 종류`}</Title>
      <Radio value={option} onChange={handleChangeRadio}>
        <Radio.Option value="새로 입력">새로 입력</Radio.Option>
        <Radio.Option value="불러오기">불러오기</Radio.Option>
      </Radio>
      <Spacing size={20} />
      {option === '새로 입력' ? <NewLocker /> : <OldLocker />}
    </>
  );
};

export default LockerPage;
