import { ColorsContext } from "@/config/ColorContext";
import { Tr, Td, Table, TableContainer, Tbody } from "@chakra-ui/react";
import { useContext } from "react";
import { getDeBBSAddress } from "@/constants/ContractAddresses";
import { useAccount } from "wagmi";
import { formatEther } from "viem";

export function DashboardTable({ totalFees, userCount }: { totalFees?: bigint; userCount: number }) {
    const colors = useContext(ColorsContext);
    const primaryColor = colors[0];
    // const bgColor = colors[1];

    const { chain } = useAccount();
    return (
        <TableContainer>
            <Table size="sm" w={500}>
                <Tbody borderRight={`1px solid ${primaryColor}`}>
                    <Tr borderTop={`1px solid ${primaryColor}`}>
                        <Td borderLeft={`1px solid ${primaryColor}`} borderBottom={`1px solid ${primaryColor}`} py={1}>
                            contract address
                        </Td>
                        <Td borderLeft={`1px solid ${primaryColor}`} borderBottom={`1px solid ${primaryColor}`} py={1}>
                            {getDeBBSAddress(chain?.id)}
                        </Td>
                    </Tr>
                    <Tr borderTop={`1px solid ${primaryColor}`}>
                        <Td borderLeft={`1px solid ${primaryColor}`} borderBottom={`1px solid ${primaryColor}`} py={1}>
                            network
                        </Td>
                        <Td borderLeft={`1px solid ${primaryColor}`} borderBottom={`1px solid ${primaryColor}`} py={1}>
                            {chain?.name}
                        </Td>
                    </Tr>
                    <Tr borderTop={`1px solid ${primaryColor}`}>
                        <Td borderLeft={`1px solid ${primaryColor}`} borderBottom={`1px solid ${primaryColor}`} py={1}>
                            total users
                        </Td>
                        <Td borderLeft={`1px solid ${primaryColor}`} borderBottom={`1px solid ${primaryColor}`} py={1}>
                            {userCount}
                        </Td>
                    </Tr>
                    <Tr borderTop={`1px solid ${primaryColor}`}>
                        <Td borderLeft={`1px solid ${primaryColor}`} borderBottom={`1px solid ${primaryColor}`} py={1}>
                            total fee earned
                        </Td>
                        <Td borderLeft={`1px solid ${primaryColor}`} borderBottom={`1px solid ${primaryColor}`} py={1}>
                            {totalFees ? formatEther(totalFees) : "0"} ETH
                        </Td>
                    </Tr>
                </Tbody>
            </Table>
        </TableContainer>
    );
}
