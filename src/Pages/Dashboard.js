import React,{useEffect, useState} from 'react'
import Profile from '../Components/Profile'
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchprofiledata,fetchuserurlData,postaddurl,postremoveurl} from '../shared/actionCreators'
import {Flex,Box,Grid, useColorModeValue} from '@chakra-ui/react'
import { Skeleton, SkeletonCircle, SkeletonText,Heading,Divider ,Button,Text,useToast} from "@chakra-ui/react"
import { Icon,useDisclosure } from "@chakra-ui/react"
import { ModalBody,Modal,ModalOverlay,ModalContent,ModalHeader,ModalCloseButton,FormControl,FormLabel,Input,
  ModalFooter,Drawer,DrawerOverlay,DrawerBody,DrawerCloseButton,DrawerContent,DrawerHeader,DrawerFooter } from "@chakra-ui/react"
import {Stat,StatLabel,StatNumber,StatHelpText,Stack,Code,Alert,AlertIcon,CircularProgress,CircularProgressLabel} from "@chakra-ui/react"
import { MdLanguage } from "react-icons/md"
import { AddIcon,ArrowRightIcon } from '@chakra-ui/icons'
import { IconButton,Image } from "@chakra-ui/react"
import { Formik } from 'formik';
import Formerror from '../Components/Formerror'

const mapStateToProps=state=>{
    return {
        profiledata:state.profiledata,
        userurls:state.userurls
    }
}
const mapDispatchToProps=dispatch=>({
    fetchprofiledata:()=>dispatch(fetchprofiledata()),
    fetchuserurlData:()=>dispatch(fetchuserurlData()),
    postaddurl:(values,toast)=>dispatch(postaddurl(values,toast)),
    postremoveurl:(values,toast)=>dispatch(postremoveurl(values,toast))
})

let fetched = false
function Dashboard(props) {
    const colormode = useColorModeValue('whitesmoke', 'black')
    let toast = useToast()
    let [selecteddata,setselecteddata]=useState(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen:drawerisOpen, onOpen:draweronOpen, onClose:draweronClose } = useDisclosure()
  const { isOpen:drawerisOpenLH, onOpen:draweronOpenLH, onClose:draweronCloseLH } = useDisclosure()

    useEffect(() => {
        (()=>{
            if(!fetched){
            props.fetchprofiledata()
            props.fetchuserurlData()
            fetched=true
            }
        })()
    },[])
    return (
        <>
        {
          (props.profiledata.err || props.userurls.err) ?
          <Box padding="10px">
            <Alert status="error" borderRadius="md">
              <AlertIcon />
              Something went wrong ! {props.profiledata.err || props.userurls.err}
            </Alert>
          </Box>
          :
            (props.profiledata.isloading || props.userurls.isloading) ?
            <Box display="flex" width="full" alignContent="center" justifyContent="center" padding="10">
                <Box>
                    <SkeletonCircle size="20" />
                    <SkeletonText mt="4" mb="4" noOfLines={4} spacing="4" />
                    <Skeleton isLoaded={!props.profiledata.isloading} height="200px" width="300px"></Skeleton>
                </Box>
            </Box>
            :
            <div>
                <Flex direction={{base:'column',md:'row'}}>
                    <Box padding={{base:"1",sm:"10"}}>
                        <Profile data={props.profiledata.profiledata}/>
                    </Box>
                    <Box flex="1" padding="12">
                      <Box display="flex" width="full">
                          <Heading as="h2" size="lg" textAlign="center" textTransform="uppercase">
                              Your Websites
                          </Heading>
                          <Icon as={MdLanguage}/>
                      </Box>

                      <Divider margin="10"/>
                      <Grid templateColumns={{sm:"repeat(1, 1fr)",lg:"repeat(3, 1fr)"}} gap={6}>
                        {
                        props.userurls.userurls.map((d,i)=>(
                          <Box onClick={()=>{
                            setselecteddata(d)
                            draweronOpen()
                          }}
                          key={i} borderRadius="md" w="100%" bg="blue.500" _hover={{bg:"blue.400",color:"whiteAlpha.900"}} 
                          padding="10px" boxShadow="lg" cursor="pointer" color="whiteAlpha.800"> 
                              <Box borderRadius="full" height="17px" width="17px" bg={d.up?"green":"red"} boxShadow="dark-lg"
                              border="2px"></Box>
                              <Text textAlign="center" textTransform="uppercase" fontWeight="bold">{d.name}</Text>
                              <Text fontSize={'sm'} textAlign="center" fontWeight="bold" mt="10px">
                              {d.maxResponseTime} ms
                              </Text>

                              {d.score?
                              <Text textAlign="center" mt="30px">Performance</Text>:
                              <Text textAlign="center" mt="30px">Performance (No data !)</Text>
                              }
                              <Box width="full" display="flex" justifyContent="center" alignContent="center" mt="5px">
                                {d.score
                                ?
                                <CircularProgress 
                                value={(d.score.Performance * 100).toFixed(0)}
                                size="120px" color="green.400">
                                  <CircularProgressLabel>{(d.score.Performance * 100).toFixed(0)}%</CircularProgressLabel>
                                </CircularProgress>
                                :
                                <CircularProgress 
                                value={0}
                                size="120px" color="green.400">
                                  <CircularProgressLabel>0%</CircularProgressLabel>
                                </CircularProgress>
                                }
                              </Box>
                              <Box width="full" display="flex" justifyContent="center" alignContent="center" mt="5px">
                                <IconButton aria-label="Search database" icon={<ArrowRightIcon />} colorScheme="green"
                                onClick={(e)=>{
                                  setselecteddata(d)
                                  e.stopPropagation()
                                  draweronOpenLH()
                                }}
                                />
                              </Box>
                              <Button size="sm" colorScheme="red" mt="12px" 
                              onClick={(e)=>{
                                e.stopPropagation()
                                props.postremoveurl({id:d._id},toast)
                              }}>Remove</Button>
                          </Box>
                        ))
                        }          
                      </Grid>
                      <Button onClick={onOpen} leftIcon={<AddIcon/>} mt="14" colorScheme={'blue'} variant={'solid'}>
                          Add a website for monitoring
                      </Button>

                      <Formik
                      initialValues={{ url: '', maxResponseTime: '',name:'' }}
                      validate={values => {
                          const errors = {};
                          if (!values.url) {
                          errors.url = 'Url is Required';
                          }else if (values.name.length>10){
                          errors.name = 'Name should have only 10 characters maximum';
                          }
                          if (!values.name) {
                          errors.name = 'Name is Required';
                          }                                    
                          if (!values.maxResponseTime) {
                          errors.maxResponseTime = 'Maximum response time is Required';
                          }   
                          return errors;
                      }}
                      onSubmit={(values, { setSubmitting }) => {
                          props.postaddurl(values,toast)
                          setSubmitting(false);
                          onClose()
                      }}
                      >
                      {({values,errors,touched,handleChange,handleBlur,handleSubmit,isSubmitting}) => (
                        <Modal isOpen={isOpen} onClose={onClose}>
                          <ModalOverlay />
                          <ModalContent>
                            <ModalHeader>Add a website</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <FormControl id="name">
                                  <FormLabel>Name</FormLabel>
                                  <Input type="text"
                                    name="name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.name}
                                  />
                                </FormControl>
                                {errors.name && touched.name && <Formerror>{errors.name}</Formerror>}
                                <FormControl id="url">
                                  <FormLabel>Url</FormLabel>
                                  <Input type="url"
                                    name="url"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.url}
                                  />
                                </FormControl>
                                {errors.url && touched.url && <Formerror>{errors.url}</Formerror>}
                                <FormControl id="maxResponseTime">
                                  <FormLabel>Maximum response time (in ms)</FormLabel>
                                  <Input type="text"
                                    name="maxResponseTime"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.maxResponseTime}
                                  />
                                </FormControl>
                                {errors.maxResponseTime && touched.maxResponseTime && <Formerror>{errors.maxResponseTime}</Formerror>}
                            </ModalBody>

                            <ModalFooter>
                              <Button variant="ghost" colorScheme="red" mr={3} onClick={onClose}>
                                Close
                              </Button>
                              <Button colorScheme={'green'} onClick={handleSubmit}>Add</Button>
                            </ModalFooter>
                          </ModalContent>
                        </Modal>
                      )}
                      </Formik>

                  </Box>
                </Flex>

                  <Drawer
                    isOpen={drawerisOpen}
                    placement="right"
                    onClose={draweronClose}
                    size="full"
                  >
                    <DrawerOverlay>
                    {
                      selecteddata &&
                      <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader>{selecteddata.name}</DrawerHeader>

                        <DrawerBody>
                          <Divider/>
                          <Box bg="blue.500" borderRadius="md" boxShadow="lg" padding="10" mt="1.5">
                            <Stack direction="row" h={{base:"150px",sm:"110px"}} color="white" p={4}>
                              <Divider orientation="vertical" borderLeftWidth="thick"/>
                              <Stat>
                                <StatLabel>Status : {selecteddata.up?'Up and running':'Server down'}</StatLabel>
                                <StatNumber>Maximum Response Time : {selecteddata.maxResponseTime} ms</StatNumber>
                                <StatHelpText>{selecteddata.url}</StatHelpText>
                              </Stat>
                            </Stack>
                          </Box>
                          <Box mt="30px">
                            <Text fontSize="3xl" fontWeight="bold">LOGS</Text>
                            <Divider mb="20px"/>
                            <Box padding="15px" boxShadow="inner" bg={colormode} borderRadius="sm">
                            <Stack direction="column">
                              {
                                selecteddata.logs.map((d,i)=>{
                                  return(
                                  <Code key={i} colorScheme={d.successful?"green":"red"} padding="5px"
                                  children={`Time: ${d.timestamp}, Response Time: ${d.responseDuration}ms,Successful: ${d.successful}`}/>
                                  )
                                })
                              }
                              {
                                (selecteddata.logs.length  === 0) &&
                                  <Code colorScheme={"green"} padding="5px" children={`No logs yet created !Refresh after some time`}/>
                              } 
                            </Stack>
                            </Box>
                          </Box>
                        </DrawerBody>

                        <DrawerFooter>
                          <Button variant="outline" mr={3} onClick={draweronClose}>
                            Back
                          </Button>
                          {/* <Button color="blue">Save</Button> */}
                        </DrawerFooter>
                      </DrawerContent>
                    }
                    </DrawerOverlay>
                  </Drawer>

                  <Drawer
                    isOpen={drawerisOpenLH}
                    placement="right"
                    onClose={draweronCloseLH}
                    size="full"
                  >
                    <DrawerOverlay>
                    {
                      selecteddata &&
                      <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader>{selecteddata.name}</DrawerHeader>

                        <DrawerBody>
                          <Divider/>
                          {
                            (selecteddata.meta && selecteddata.meta.title) &&
                            <Box bg="blue.500" borderRadius="md" boxShadow="lg" padding="10" mt="1.5" color="white">
                                  <Image src={selecteddata.meta.icon}></Image>
                                <Stat>
                                  <StatNumber>{selecteddata.meta.title}</StatNumber>
                                  <StatLabel>{selecteddata.meta.description}</StatLabel>
                                </Stat>
                            </Box>
                          }
                          <Box mt="30px">
                            <Text fontSize="3xl" fontWeight="bold">PERFORMANCE DATA</Text>
                            <Divider mb="20px"/>
                            <Box padding="15px" boxShadow="inner" bg={colormode} borderRadius="sm">
                            <Grid templateColumns={{sm:"repeat(1, 1fr)",lg:"repeat(3, 1fr)"}} gap={6}>
                              {
                              selecteddata.score?
                              Object.entries(selecteddata.score).map(([k,v])=>(
                                <Box
                                key={k} borderRadius="md" w="full" bg="blue.500" _hover={{bg:"blue.400",color:"whiteAlpha.900"}} 
                                padding="10px" boxShadow="lg" cursor="pointer" color="whiteAlpha.800" display="flex" justifyContent="center" alignContent="center"> 
                                      {v
                                      ?
                                      <Box>
                                      <Text textAlign="center" mb="20px" fontWeight="bold">{k}</Text>
                                      <CircularProgress 
                                      value={v * 100}
                                      size="120px" color="green.400">
                                        <CircularProgressLabel>{(v * 100).toFixed(0)}%</CircularProgressLabel>
                                      </CircularProgress>
                                      </Box>
                                      :
                                      <Box>
                                      <Text textAlign="center" mb="20px" fontWeight="bold">{k} (Node data !)</Text>
                                      <CircularProgress 
                                      value={0}
                                      size="120px" color="green.400">
                                        <CircularProgressLabel>0%</CircularProgressLabel>
                                      </CircularProgress>
                                      </Box>
                                      }
                                </Box>
                              ))
                              :<Text fontWeight="bold" textTransform="uppercase">No data !</Text>
                              }  
                              <Button colorScheme="whatsapp" target="blank"
                              as="a" href="https://web.dev/vitals/?gclid=Cj0KCQiA-OeBBhDiARIsADyBcE5uGYrSXy5SJGTexGnxhGgHKLYt4sLRf_H6ujaKhoF5r8321DW1gGcaAm2oEALw_wcB">
                                For More Info See Here
                              </Button>
                            </Grid>
                            </Box>
                          </Box>
                        </DrawerBody>

                        <DrawerFooter>
                          <Button variant="outline" mr={3} onClick={draweronCloseLH}>
                            Back
                          </Button>
                        </DrawerFooter>
                      </DrawerContent>
                    }
                    </DrawerOverlay>
                  </Drawer>
            </div>
        }
        </>
    )
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Dashboard));