import { ColorsContext } from "@/config/ColorContext";
import { Tr, Td, Table, TableContainer, Tbody } from "@chakra-ui/react";
import { useContext } from "react";
import { getDeBBSAddress } from "@/constants/ContractAddresses";
import { useAccount } from "wagmi";

export function DashboardTable() {
    const colors = useContext(ColorsContext);
    const primaryColor = colors[0];
    // const bgColor = colors[1];

    const { chain } = useAccount();
    return (
        <TableContainer>
            <Table size="sm" w={500}>
                <Tbody borderRight={`1px solid ${primaryColor}`}>
                    <Tr borderTop={`1px solid ${primaryColor}`}>
                        <Td borderLeft={`1px solid ${primaryColor}`} borderBottom={`1px solid ${primaryColor}`}>
                            contract address
                        </Td>
                        <Td borderLeft={`1px solid ${primaryColor}`} borderBottom={`1px solid ${primaryColor}`}>
                            {getDeBBSAddress(chain?.id)}
                        </Td>
                    </Tr>
                    <Tr borderTop={`1px solid ${primaryColor}`}>
                        <Td borderLeft={`1px solid ${primaryColor}`} borderBottom={`1px solid ${primaryColor}`}>
                            network
                        </Td>
                        <Td borderLeft={`1px solid ${primaryColor}`} borderBottom={`1px solid ${primaryColor}`}>
                            {chain?.name}
                        </Td>
                    </Tr>
                    <Tr borderTop={`1px solid ${primaryColor}`}>
                        <Td borderLeft={`1px solid ${primaryColor}`} borderBottom={`1px solid ${primaryColor}`}>
                            total users
                        </Td>
                        <Td borderLeft={`1px solid ${primaryColor}`} borderBottom={`1px solid ${primaryColor}`}>
                            [not implemented]
                        </Td>
                    </Tr>
                    <Tr borderTop={`1px solid ${primaryColor}`}>
                        <Td borderLeft={`1px solid ${primaryColor}`} borderBottom={`1px solid ${primaryColor}`}>
                            total fee earned
                        </Td>
                        <Td borderLeft={`1px solid ${primaryColor}`} borderBottom={`1px solid ${primaryColor}`}>
                            [not implemented]
                        </Td>
                    </Tr>
                </Tbody>
            </Table>
        </TableContainer>
    );
}
