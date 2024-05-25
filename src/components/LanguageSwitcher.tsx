// src/components/LanguageSwitcher.tsx
import React from 'react';
import { Menu, MenuButton, MenuList, MenuItem, Button, HStack, ButtonProps, Text } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useTranslation } from 'react-i18next';
import ReactCountryFlag from "react-country-flag";

const LanguageSwitcher: React.FC<ButtonProps> = (props) => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />} {...props}>
        Select Language
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => changeLanguage('en')}>
          <HStack>
            <ReactCountryFlag countryCode="GB" svg style={{ width: '1.5em', height: '1.5em' }} />
            <Text ml={2} color="black" fontWeight="bold">English</Text>
          </HStack>
        </MenuItem>
        <MenuItem onClick={() => changeLanguage('fr')}>
          <HStack>
            <ReactCountryFlag countryCode="FR" svg style={{ width: '1.5em', height: '1.5em' }} />
            <Text ml={2} color="black" fontWeight="bold">Français</Text>
          </HStack>
        </MenuItem>
        <MenuItem onClick={() => changeLanguage('de')}>
          <HStack>
            <ReactCountryFlag countryCode="DE" svg style={{ width: '1.5em', height: '1.5em' }} />
            <Text ml={2} color="black" fontWeight="bold">Deutsch</Text>
          </HStack>
        </MenuItem>
        <MenuItem onClick={() => changeLanguage('it')}>
          <HStack>
            <ReactCountryFlag countryCode="IT" svg style={{ width: '1.5em', height: '1.5em' }} />
            <Text ml={2} color="black" fontWeight="bold">Italiano</Text>
          </HStack>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default LanguageSwitcher;
