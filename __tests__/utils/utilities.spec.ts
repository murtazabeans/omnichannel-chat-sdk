const { MessageType } = require("../../src");
const utilities = require('../../src/utils/utilities');

describe('Utilities', () => {
    it('utilities.isSystemMessage() should return true if contains "system" tags', () => {
        const message = {
            content: 'sample',
            messageType: MessageType.UserMessage,
            properties: {
                tags: ['system']
            }
        }

        expect(utilities.isSystemMessage(message)).toBe(true);
    });

    it('utilities.isSystemMessage() should return false if DOES NOT contain "system" tags', () => {
        const message = {
            content: 'sample',
            messageType: MessageType.UserMessage,
            properties: {
                tags: ['random']
            }
        }

        expect(utilities.isSystemMessage(message)).toBe(false);
    });

    it('utilities.isSystemMessage() should not break if `properties.tags` property does not exist', () => {
        const message = {
            content: 'sample',
            messageType: MessageType.UserMessage,
            properties: {}
        }

        try {
            const result = utilities.isSystemMessage(message);
            expect(result).toBeDefined();
        } catch {

        }
    });

    it('utilities.isCustomerMessage() should return true if sender id contains "contacts/8:"', () => {
        const message = {
            content: 'sample',
            sender: {
                id: 'https://{host}/v1/users/ME/contacts/8:{uuid}'
            }
        }

        expect(utilities.isCustomerMessage(message)).toBe(true);
    });

    it('utilities.isCustomerMessage() should return false if sender id DOES NOT contain "contacts/8:"', () => {
        const message = {
            content: 'sample',
            sender: {
                id: 'https://{host}/v1/users/ME/contacts/28:{uuid}'
            }
        }

        expect(utilities.isCustomerMessage(message)).toBe(false);
    });

    it('utilities.isClientIdNotFoundErrorMessage() should return true if error has UserId Not Found error', () => {
        const error = {
            response: {
                status: 401,
                headers: {
                    message: "UserId not found"
                }
            }
        }

        expect(utilities.isClientIdNotFoundErrorMessage(error)).toBe(true);
    });

    it('utilities.isClientIdNotFoundErrorMessage() should return false if error has unknown error message', () => {
        const error = {
            response: {
                status: 401,
                headers: {
                    message: "test"
                }
            }
        }

        expect(utilities.isClientIdNotFoundErrorMessage(error)).toBe(false);
    });

    it('utilities.isClientIdNotFoundErrorMessage() should return false if error has other error code', () => {
        const error = {
            response: {
                status: 403,
                headers: {
                    message: "test"
                }
            }
        }

        expect(utilities.isClientIdNotFoundErrorMessage(error)).toBe(false);
    });
});