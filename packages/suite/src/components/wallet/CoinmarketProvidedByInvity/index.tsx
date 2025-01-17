import React from 'react';
import styled from 'styled-components';
import { Translation } from '@suite-components';
import { INVITY_URL } from '@trezor/urls';
import { resolveStaticPath } from '@trezor/utils';
import { variables, Link } from '@trezor/components';

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    font-weight: ${variables.FONT_WEIGHT.MEDIUM};
    color: ${props => props.theme.TYPE_LIGHT_GREY};
`;

const Image = styled.img`
    width: 70px;
`;

const StyledLink = styled(Link)`
    display: flex;
    flex: 1;
    padding-top: 1px;
    align-items: center;
`;

const CoinmarketProvidedByInvity = () => (
    <Wrapper>
        <Translation id="TR_BUY_PROVIDED_BY_INVITY" />
        <StyledLink href={INVITY_URL} target="_blank">
            <Image src={resolveStaticPath('/images/svg/invity-logo.svg')} />
        </StyledLink>
    </Wrapper>
);

export default CoinmarketProvidedByInvity;
