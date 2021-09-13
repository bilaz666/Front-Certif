import { useContext, useEffect, useState } from 'react'
import {
  Alert,
  AlertIcon,
  Input,
  Button,
  Flex,

  HStack,
  Spinner,
  useToast,
} from '@chakra-ui/react'
import { Web3Context } from 'web3-hooks'
import { GameKeysContext } from '../App'

function Admin() {
  const [web3State] = useContext(Web3Context)
  const gameKeys = useContext(GameKeysContext)
  const [isLoading, setIsLoading] = useState(false)
  const [inputValue, SetInputValue] = useState('')
  const toast = useToast()

  const handleClickAddGameCreator = async () => {
    try {
      setIsLoading(true)
      let tx = await gameKeys.addGameCreator(inputValue)
      await tx.wait()
      toast({
        title: 'Confirmed transaction',
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    } catch (e) {
      if (e.code === 4001) {
        toast({
          title: 'Transaction signature denied',
          description: e.message,
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      }
      console.log(e)
    } finally {
      setIsLoading(false)
    }
  }

  // Listen to GameCreatorAdded event and react with a state change
  useEffect(() => {
    if (gameKeys) {
      const cb = (account) => {
        if (account.toLowerCase() !== web3State.account.toLowerCase()) {
          toast({
            title: 'Event GameCreatorAdded',
            description: `${account} has now GAME_CREATOR role`,
            status: 'info',
            position: 'top-right',
            duration: 9000,
            isClosable: true,
          })
        }
      }
      // ecouter sur l'event DataSet
      gameKeys.on('GameCreatorAdded', cb)
      return () => {
        // arreter d'ecouter lorsque le component sera unmount
        gameKeys.off('GameCreatorAdded', cb)
      }
    }
  }, [gameKeys, web3State.account, toast])

  return (
    <>
      <Flex flexDirection="column" alignItems="center" m={4} h="300px">
        {!gameKeys ? (
          <Spinner
            size="xl"
            label="Connecting to Ethereum"
            color="blue.500"
            emptyColor="gray.200"
          />
        ) : (
          <>
            {web3State.chainId === 42 ? (
              <>
                <HStack>
                  <Input
                    width="50"
                    value={inputValue}
                    placeholder="address"
                    onChange={(event) => SetInputValue(event.target.value)}
                  />
                  <Button
                    isLoading={isLoading}
                    loadingText="adding game creator"
                    colorScheme="teal"
                    onClick={handleClickAddGameCreator}
                  >
                    add game creator
                  </Button>
                </HStack>
              </>
            ) : (
              <Alert status="error">
                <AlertIcon />
                You are on the wrong network please switch to Kovan
              </Alert>
            )}
          </>
        )}
      </Flex>
    </>
  )
}

export default Admin;