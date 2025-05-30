import { Flex, Box } from '@chakra-ui/react';
import { Heart } from 'lucide-react'; // or your heart icon import

const Footer = () => {
  return (
    <Box as='footer'>
      <Flex
        margin='0 auto'
        px={12}
        color='white'
        justifyContent='center'
        alignItems='center'
        maxWidth='1024px'
        height={16}
      >
        <Box as='p' display='flex' alignItems='center'>
          <Box as='span' pr={1}>
            Hussain
          </Box>
          <Box
            as={Heart}
            size={20}
            color='red'
            display='inline-block'
            css={{
              animation: 'heartbeat 1.5s ease-in-out infinite',
              '@keyframes heartbeat': {
                '0%': { transform: 'scale(1)', opacity: 1 },
                '50%': { transform: 'scale(1.2)', opacity: 0.8 },
                '100%': { transform: 'scale(1)', opacity: 1 },
              },
            }}
          />
          <Box as='span' pl={1}>
            {new Date().getFullYear()}
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default Footer;
