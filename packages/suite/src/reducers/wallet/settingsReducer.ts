import produce from 'immer';
import { PROTO } from '@trezor/connect';
import { STORAGE } from '@suite-actions/constants';
import { WalletSettings } from '@suite-common/wallet-types';
import { WALLET_SETTINGS } from '@settings-actions/constants';
import { Action, AppState } from '@suite-types';

export type State = WalletSettings;

export const initialState: State = {
    localCurrency: 'usd',
    discreetMode: false,
    enabledNetworks: ['btc'],
    bitcoinAmountUnit: PROTO.AmountUnit.BITCOIN,
    lastUsedFeeLevel: {},
};

const settingsReducer = (state: State = initialState, action: Action): State =>
    produce(state, draft => {
        switch (action.type) {
            case STORAGE.LOAD:
                return action.payload.walletSettings || state;

            case WALLET_SETTINGS.SET_LOCAL_CURRENCY:
                draft.localCurrency = action.localCurrency;
                break;

            case WALLET_SETTINGS.SET_HIDE_BALANCE:
                draft.discreetMode = action.toggled;
                break;

            case WALLET_SETTINGS.CHANGE_NETWORKS:
                draft.enabledNetworks = action.payload;
                break;

            case WALLET_SETTINGS.SET_LAST_USED_FEE_LEVEL:
                if (action.feeLevel) {
                    draft.lastUsedFeeLevel[action.symbol] = action.feeLevel;
                } else {
                    delete draft.lastUsedFeeLevel[action.symbol];
                }
                break;
            case WALLET_SETTINGS.SET_BITCOIN_AMOUNT_UNITS:
                draft.bitcoinAmountUnit = action.payload;
                break;

            // no default
        }
    });

export const selectEnabledNetworks = (state: AppState) => state.wallet.settings.enabledNetworks;

export default settingsReducer;
