import {Box,Center,useColorModeValue,Heading,Text,Stack,Image,} from '@chakra-ui/react';

export default function Profile({data}) {
  return (
    <Center py={12}>
      <Box
        role={'group'}
        p={6}
        maxW={'330px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'lg'}
        pos={'relative'}
        zIndex={1}>
        <Box
          rounded={'lg'}
          mt={-12}
          pos={'relative'}
          height={'230px'}
          _after={{
            transition: 'all .3s ease',
            content: '""',
            w: 'full',
            h: 'full',
            pos: 'absolute',
            top: '1px',
            left: 0,
            backgroundImage: `url(${data.user.picture})`,
            filter: 'blur(10px)',
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: 'blur(20px)',
            },
          }}>
          <Image
            rounded={'lg'}
            height={230}
            width={282}
            objectFit={'cover'}
            src={data.user.picture}
          />
        </Box>
        <Stack pt={10} align={'center'}>
          <Text color={'gray.500'} fontSize={'sm'}>
            {data.user.email}
          </Text>
          <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500} textTransform={'uppercase'}> 
            {data.user.name}
          </Heading>
            <Heading fontSize={'xl'} fontFamily={'body'} fontWeight={500}>
            {data.user.mobile}
          </Heading>
        </Stack>
      </Box>
    </Center>
  );
}