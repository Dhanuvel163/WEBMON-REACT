import {
  Box,Flex,Text,IconButton,Stack,Collapse,Icon,Link,Popover,PopoverTrigger,PopoverContent,
  useColorModeValue,useBreakpointValue,useDisclosure,Image,Button
} from '@chakra-ui/react';
import {HamburgerIcon,CloseIcon,ChevronDownIcon,ChevronRightIcon} from '@chakra-ui/icons';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchuserdata} from '../shared/actionCreators'

const mapStateToProps=state=>{
    return {
        users:state.users
    }
}
const mapDispatchToProps=dispatch=>({
    fetchuserdata:()=>dispatch(fetchuserdata()),
})
function WithSubnavigation(props) {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box position="fixed" width="full" top="0" zIndex={2}>
      <Flex
        bg={useColorModeValue('white', 'gray.700')} color={useColorModeValue('gray.600', 'white')}
        minH={'60px'} py={{ base: 2 }} px={{ base: 4 }}borderBottom={1} borderStyle={'solid'} 
        borderColor={useColorModeValue('gray.200', 'gray.900')} align={'center'}
        boxShadow={'md'}
        >
        <Flex flex={{ base: 1, md: 'auto' }} ml={{ base: -2 }} display={{ base: 'flex', md: 'none' }}>
          {/* <IconButton
            onClick={onToggle}
            icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
            variant={'ghost'} aria-label={'Toggle Navigation'}
          /> */}
          {
            props.users.isloggedin &&
            <Button onClick={
              ()=>{
                localStorage.removeItem('token')
                props.fetchuserdata()
                props.history.push('/')
              }
            }
              display={'inline-flex'} fontSize={'sm'}  fontWeight={600} color={'white'} bg={'pink.400'}
              href={'#'} _hover={{ bg: 'pink.300' }}>
              Logout
            </Button>
          }
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Text
            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
            fontFamily={'heading'} color={useColorModeValue('gray.800', 'white')}>
                <Image src="/logo.webp" height="10" boxShadow="md" borderRadius="full"/>
          </Text>
          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack flex={{ base: 1, md: 0 }} justify={'flex-end'} direction={'row'} spacing={6}>
          {
            props.users.isloggedin &&
            <Button onClick={
              ()=>{
                localStorage.removeItem('token')
                props.fetchuserdata()
                props.history.push('/')
              }
            }
              display={{base:'none',sm:'inline-flex'}} fontSize={'sm'}  fontWeight={600} color={'white'} bg={'pink.400'}
              href={'#'} _hover={{ bg: 'pink.300' }}>
              Logout
            </Button>
          }
          <ColorModeSwitcher justifySelf="flex-end" />
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
    const colormode = useColorModeValue('gray.600', 'gray.200')
    const colormode1 = useColorModeValue('gray.800', 'white')
    const colormode2 = useColorModeValue('white', 'gray.800')

  return (
    <Stack direction={'row'} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label} alignItems={'center'} display={'flex'}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <Link
                p={2} href={navItem.href ?? '#'} fontSize={'sm'} fontWeight={500} alignItems={'center'} color={colormode}
                _hover={{ textDecoration: 'none', color: colormode1,}}>
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0} boxShadow={'xl'} bg={colormode2} p={4} rounded={'xl'} minW={'sm'}>
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};
const DesktopSubNav = ({ label, href, subLabel }) => {
  return (
    <Link
      href={href} role={'group'} display={'block'} p={2} rounded={'md'}
      _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}
      >
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text transition={'all .3s ease'} _groupHover={{ color: 'pink.400' }} fontWeight={500}>
            {label}
          </Text>
          <Text fontSize={'sm'}>{subLabel}</Text>
        </Box>
        <Flex
          transition={'all .3s ease'} transform={'translateX(-10px)'} opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'} align={'center'} flex={1}>
          <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};
const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')} p={4} display={{ md: 'none' }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};
const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      {/* <Flex
        py={2} as={Link} href={href ?? '#'} justify={'space-between'} align={'center'} _hover={{ textDecoration: 'none', }}>
        <Text fontWeight={600} color={useColorModeValue('gray.600', 'gray.200')}>
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon} transition={'all .25s ease-in-out'} transform={isOpen ? 'rotate(180deg)' : ''}
            w={6} h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2} pl={4} borderLeft={1} borderStyle={'solid'} borderColor={useColorModeValue('gray.200', 'gray.700')} align={'start'}>
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse> */}
    </Stack>
  );
};


const NAV_ITEMS= [
  // {
  //   label: 'link1',
  //   children: [
  //     {
  //       label: 'Explore Design Work',
  //       subLabel: 'Trending Design to inspire you',
  //       href: '#',
  //     },
  //     {
  //       label: 'New & Noteworthy',
  //       subLabel: 'Up-and-coming Designers',
  //       href: '#',
  //     },
  //   ],
  // },
  // {
  //   label: 'Learn 2',
  //   href: '#',
  // }
];

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(WithSubnavigation));