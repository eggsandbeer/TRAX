import { useState } from 'react'
import {
  // ButtonGroup,
  Box,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderTrack,
  RangeSliderThumb,
  // Center,
  Flex,
  Text,
  Spacer,
} from '@chakra-ui/react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import Player from './player'

const PlayerBar = () => {
  const songs = useStoreState((state: any) => state.activeSongs)
  const activeSong = useStoreState((state: any) => state.activeSong)
  const volume = useStoreState((state: any) => state.volume)
  const setVolume = useStoreActions((state: any) => state.setVolume)

  // const [volume, setVolume] = useState([0.05])

  const handleVolumeChange = (e) => {
    setVolume(e)
  }

  return (
    <Box width="100vw" bg="gray.900" padding="5px" height="120px">
      {activeSong && (
        <Flex align="center">
          <Box paddingX="20px" paddingY="10px" color="white" width="25%">
            <Text fontSize="large">{activeSong.name}</Text>
            <Text fontSize="sm">{activeSong.artist.name}</Text>
          </Box>

          <Box paddingX="20px" paddingY="10px" color="white" width="50%">
            <Player songs={songs} activeSong={activeSong} />
          </Box>
          <Box paddingX="20px" paddingY="10px" color="white" width="25%">
            <Flex align="center">
              <Box width="60%" />
              <Box width="40%">
                <Flex justify="center" align="center" width="100%">
                  <Text marginRight="3px" fontSize="x-small">
                    0
                  </Text>
                  <RangeSlider
                    aria-label={['volume-min', 'volume-max']}
                    step={0.01}
                    id="volume-range"
                    min={0}
                    max={0.99}
                    onChange={(e) => {
                      // console.log(e)
                      setVolume(e)
                    }}
                    value={volume}
                    // onChangeStart={() => setIsSeeking(true)}
                    // onChangeEnd={() => setIsSeeking(false)}
                  >
                    <RangeSliderTrack background="gray.800">
                      <RangeSliderFilledTrack background="gray.600" />
                    </RangeSliderTrack>
                    <RangeSliderThumb index={0} />
                  </RangeSlider>
                  <Text marginLeft="3px" fontSize="x-small">
                    100
                  </Text>
                </Flex>
              </Box>
            </Flex>
          </Box>
        </Flex>
      )}
    </Box>
  )
}

export default PlayerBar
