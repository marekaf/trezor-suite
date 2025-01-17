import { ExtraDependencies } from '@suite-common/redux-utils';
import { NetworkSymbol } from '@suite-common/wallet-config';

import { STORAGE } from '../actions/suite/constants';
import { addEvent } from '../actions/suite/notificationActions';
import { StorageLoadAction } from '../actions/suite/storageActions';
import type { BlockchainState } from '../reducers/wallet/blockchainReducer';
import { AppState } from '../types/suite';
import * as transactionActions from '@wallet-actions/transactionActions';
import * as metadataActions from '@suite-actions/metadataActions';

export const extraDependencies: ExtraDependencies = {
    thunks: { notificationsAddEvent: addEvent },
    selectors: {
        selectFeeInfo: (networkSymbol: NetworkSymbol) => (state: AppState) =>
            state.wallet.fees[networkSymbol],
        selectDevices: (state: AppState) => state.devices,
        selectBitcoinAmountUnit: (state: AppState) => state.wallet.settings.bitcoinAmountUnit,
        selectEnabledNetworks: (state: AppState) => state.wallet.settings.enabledNetworks,
        selectAccountTransactions: (state: AppState) => state.wallet.transactions.transactions,
    },
    actions: {
        addTransaction: transactionActions.add,
        removeTransaction: transactionActions.remove,
        setAccountLoadedMetadata: metadataActions.setAccountLoaded,
        setAccountAddMetadata: metadataActions.setAccountAdd,
    },
    actionTypes: {
        storageLoad: STORAGE.LOAD,
    },
    reducers: {
        // @TODO - use BlockchainState from @suite-common/wallet-blockchain after redux-utils will be merged
        storageLoadBlockchain: (state: BlockchainState, { payload }: StorageLoadAction) => {
            payload.backendSettings.forEach(backend => {
                state[backend.key].backends = backend.value;
            });
        },
        storageLoadAccounts: (_, { payload }: StorageLoadAction) => payload.accounts,
    },
};
