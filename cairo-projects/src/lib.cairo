use starknet::{ContractAddress};
#[starknet::interface]
trait ISimpleStorage<TContractState> {
    fn set(ref self: TContractState, x: u128);
    fn get(self: @TContractState) -> u128;
    fn get_again(self: @TContractState) -> u128;
}

#[starknet::contract]
mod SimpleStorage {
    use starknet::{ContractAddress, get_caller_address};
    #[storage]
    struct Storage {
        data: u128,
        fav: LegacyMap<ContractAddress, u128>
    }

    #[event]
    #[derive(Copy, Drop, Debug, PartialEq, starknet::Event)]
    pub enum Event {
        ValueSet: ValueSet
    }

    #[derive(Copy, Drop, Debug, PartialEq, starknet::Event)]
    pub struct ValueSet {
        pub value: u128,
    }

    #[abi(embed_v0)]
    impl SimpleStorage of super::ISimpleStorage<ContractState> {
        fn set(ref self: ContractState, x: u128) {
            let caller = get_caller_address();
            self.fav.write(caller, x);
            self.data.write(x);
        }

        fn get(self: @ContractState) -> u128 {
            self.data.read()
        }

        fn get_again(self: @ContractState) -> u128 {
            let caller = get_caller_address();
            self.fav.read(caller)
        }
    }
}
