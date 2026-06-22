const ClassBaseProxyModbus = require('./../../srvProxyModbusBase/js/srvProxyModbusBase');

const THIS_NAME = 'proxymodbusrtu';
const PRIMARY_BUS = 'modbusrtuBus';
const PROTOCOL = 'modbusrtu';

BUS_NAMES_LIST = ['sysBus', PRIMARY_BUS, 'logBus'];

class ProxyModbusRTU extends ClassBaseProxyModbus {
    /**
     * @constructor
     * @description
     * Конструктор класса
     * @param {[ClassBus_S]} _busList - список шин, созданных в проекте
     */
    constructor({ _busList, _node }) {
        super({ _name: THIS_NAME, _busNameList: BUS_NAMES_LIST, _busList, _node, _type: 'RTU' }); 
    }

    /**
     * @method
     * @description Отправляет службе modbusclientrtu топик и значение, которое требуется записать
     * @param {Object} _topic         - Топик сообщения 
     * @param {Object} _msg           - Сообщение
     */
    HandlerEvents_proxymodbusrtu_send( _topic, _msg ) {
        this.Modbus_send_message(_topic, _msg);
    }
    /**
     * @method
     * @description Обновляет значение канала
     * @param {Object} _topic         - Топик сообщения 
     * @param {Object} _msg           - Сообщение
     */
    HandlerEvents_proxymodbusrtu_msg_get( _topic, _msg ) {
        this.Modbus_get_message(_topic, _msg);
    }
}

module.exports = ProxyModbusRTU;