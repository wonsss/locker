import useNewLocker from './useNewLocker';

import { NumberInput, Lockers, Border, Text, UnderLineInput } from 'components';

import { colors } from 'constants/colors';

export default function NewLocker() {
  const {
    message,
    locker,
    lockerList,
    handleChangeMatrixInput,
    handleChangeTitleInput,
  } = useNewLocker();

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', margin: '0 24px' }}>
        <NumberInput
          title="행"
          onChange={(e) => handleChangeMatrixInput(e, 'row')}
          value={locker.row}
          autoFocus
        />
        <NumberInput
          title="열"
          onChange={(e) => handleChangeMatrixInput(e, 'column')}
          value={locker.column}
        />
        <UnderLineInput
          onChange={handleChangeTitleInput}
          value={locker.title}
          placeholder="사물함 이름"
        />
      </div>
      <div style={{ display: 'flex', margin: '12px 30px 0' }}>
        <Text color={colors.teal200} fontSize="15px">
          {message}
        </Text>
      </div>
      <Border size={20} />
      <Lockers column={Number(locker.column)} lockerList={lockerList} />
    </>
  );
}
