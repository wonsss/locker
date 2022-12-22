import shuffle from 'lodash.shuffle';
import { useNavigate } from 'react-router';

import { Button, Text } from 'components';

import { colors } from 'constants/colors';

const NotFoundPage = () => {
  const navigate = useNavigate();
  const handleClickHomeButton = () => {
    navigate('/');
  };
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '40px',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Text color={colors.grey500} fontSize="100px" fontWeight="bold">
        404
      </Text>
      <Text color={colors.grey500} fontSize="30px">
        Page Not Found
      </Text>
      <Text color={colors.grey500} fontSize="60px">
        {shuffle(emoticonList)[0]}
      </Text>
      <Button onClick={handleClickHomeButton} size="medium">
        Home으로 가기
      </Button>
    </div>
  );
};

export default NotFoundPage;

const emoticonList = [
  '૮꒰ྀི⋆ʾ ˙̫̮ ʿ⋆꒱ྀིა',
  '(•̀ᴗ•́)و ̑̑♡٩',
  '૮꒰ ྀི ◜ . ◝ ྀི꒱ა',
  '⸝⸝◜࿀◝ ⸝⸝',
  '( ◜‿◝ )*.✧',
  '●̑ᴗ●̑',
  '( • .̮ •)◞⸒⸒',
  '(๑╹ワ╹)',
  '⊂((・▽・))⊃',
  '(●⌒∇⌒●)',
  '♪(*´θ｀)ノ',
  '(*′☉.̫☉)',
  '( °̥̥̥̥̥̥̥̥◡͐°̥̥̥̥̥̥̥̥)',
  '(๑˙ϖ˙๑ )',
  'ᑦ(⁎˙ ▿ ˙)ᐣ',
  '( ⸝⸝⸝ᓀ .̫ᓂ⸝⸝⸝ )',
  '( ͡° ͜ʖ ͡°)',
  '(⁎छ˼̲̮छ)',
  'ヾ( •́д•̀ ;)ﾉ',
];
