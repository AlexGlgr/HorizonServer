const ClassBaseProxyModbus = require('./../../srvProxyModbusBase/js/srvProxyModbusBase');

const THIS_NAME = 'proxymodbustcp';
const PRIMARY_BUS = 'modbustcpBus';
const PROTOCOL = 'modbustcp';

BUS_NAMES_LIST = ['sysBus', PRIMARY_BUS, 'logBus'];

class ProxyModbusTCP extends ClassBaseProxyModbus {
    /**
     * @constructor
     * @description
     * Конструктор класса
     * @param {[ClassBus_S]} _busList - список шин, созданных в проекте
     */
    constructor({ _busList, _node }) {
        super({ _name: THIS_NAME, _busNameList: BUS_NAMES_LIST, _busList, _node, _type: 'TCP' }); 
    }

    /**
     * @method
     * @description Отправляет службе modbusclienttcp топик и значение, которое требуется записать
     * @param {Object} _topic         - Топик сообщения 
     * @param {Object} _msg           - Сообщение
     */
    HandlerEvents_proxymodbustcp_send( _topic, _msg ) {
        this.Modbus_send_message(_topic, _msg);
    }
    /**
     * @method
     * @description Обновляет значение канала
     * @param {Object} _topic         - Топик сообщения 
     * @param {Object} _msg           - Сообщение
     */
    HandlerEvents_proxymodbustcp_msg_get( _topic, _msg ) {
        this.Modbus_get_message(_topic, _msg);
    }
}

module.exports = ProxyModbusTCP;