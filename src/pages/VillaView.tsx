import { Flex, Box, RadioCard, For, Heading, Stack, HStack } from '@chakra-ui/react';
import AGroundFloor from '../SVGs/ClusterA/AGroundFloor';
import React from 'react';
import AFirstFloor from '../SVGs/ClusterA/AFirstFloor';
import { useParams } from 'react-router-dom';
import ASecondFloor from '../SVGs/ClusterA/ASecondFloor';
import ARoof from '../SVGs/ClusterA/ARoof';
import BSecondFloor from '../SVGs/ClusterB/BSecondFloor';
import BFirstFloor from '../SVGs/ClusterB/BFirstFloor';
import BGroundFloor from '../SVGs/ClusterB/BGroundFloor';
import BRoof from '../SVGs/ClusterB/BRoof';
import TWGroundFloor from '../SVGs/ClusterTW/TWGroundFloor';
import TWFirstFloor from '../SVGs/ClusterTW/TWFirstFloor';
import TWRoof from '../SVGs/ClusterTW/TWRoof';
import TWSecondFloor from '../SVGs/ClusterTW/TWSecondFloor';

const VillaView: React.FC = () => {
  const { clusterId } = useParams<{ clusterId: string }>(); // Get route param
  const { FloorId } = useParams<{ FloorId: string }>(); // Get route param
  const Floors = [{ value: 'GF', key: 'groundFloor' }, { value: '1F', key: 'firstFloor' }, { value: '2F', key: 'secondFloor' }, { value: 'RF', key: 'Roof' }];
  const defaultSelectedFloor = Floors.filter((item) => item.key === FloorId)[0];
  const [selectedFloor, setSelectedFloor] = React.useState<{ key: string, value: string }>(defaultSelectedFloor);
  return (
    <Box>
      <Flex alignItems={'center'} justifyContent={'center'} >

        {clusterId?.indexOf('A') !== -1 ? selectedFloor.key === 'groundFloor' ? <AGroundFloor /> : selectedFloor.key === 'firstFloor' ? <AFirstFloor /> : selectedFloor.key === 'secondFloor' ? <ASecondFloor /> : selectedFloor.key === 'Roof' ? <ARoof /> : null : null}
        {clusterId?.indexOf('B') !== -1 ? selectedFloor.key === 'groundFloor' ? <BGroundFloor /> : selectedFloor.key === 'firstFloor' ? <BFirstFloor /> : selectedFloor.key === 'secondFloor' ? <BSecondFloor /> : selectedFloor.key === 'Roof' ? <BRoof /> : null : null}
        {clusterId?.indexOf('T') !== -1 ? selectedFloor.key === 'groundFloor' ? <TWGroundFloor /> : selectedFloor.key === 'firstFloor' ? <TWFirstFloor /> : selectedFloor.key === 'secondFloor' ? <TWSecondFloor /> : selectedFloor.key === 'Roof' ? <TWRoof /> : null : null}
      </Flex>
      <Box
        position="absolute"
        top="55px"
        left="55px"
        zIndex="10"
        bg="blackAlpha.600"
        p="4"
        color={"white"}
        borderRadius="md"
        boxShadow="lg"
        width="80px"
      >
        <Heading fontSize="md" mb="2">
          Floors
        </Heading>

        <RadioCard.Root defaultValue={selectedFloor.key} variant="surface"
          colorPalette="blue" onChange={(event) => setSelectedFloor(Floors.filter((item) => item.key === (event.target as HTMLInputElement).value)[0])}>
          {Floors.map((item) => (
            <RadioCard.Item key={item.key} value={item.key}>
              <RadioCard.ItemHiddenInput />
              <RadioCard.ItemControl>
                <RadioCard.ItemText>{item.value}</RadioCard.ItemText>
              </RadioCard.ItemControl>
            </RadioCard.Item>
          ))}
        </RadioCard.Root>
      </Box>
    </Box>
  );
};

export default VillaView;