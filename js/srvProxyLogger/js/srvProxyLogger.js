const ClassBaseService_S = require('srvService');

const EVENT_SYSBUS_LIST = ['all-init-stage1-set'];
const EVENT_LOGBUS_LIST = ['logger-proxy'];
const BUS_NAMES_LIST = ['sysBus', 'logBus'];
/**
 * @class
 * Класс предоставляет инструменты для логирования 
 */
class ClassProxyLogger extends ClassBaseService_S {
    #_OutNode;
    /**
     * @constructor
     * @description
     * Конструктор класса логгера
     * @param {[ClassBus_S]} _busList - список шин, созданных в проекте
     */
    constructor({ _busList, _node }) {
        super({ _name: 'proxylogger', _busNameList: BUS_NAMES_LIST, _busList, _node });
        this.FillEventOnList('sysBus', EVENT_SYSBUS_LIST);
        this.FillEventOnList('logBus', EVENT_LOGBUS_LIST);

        this.EmitEvents_logger_log({level: 'INFO', msg: 'Proxy Logger initialized.'});
    }
    /**
     * @method
     * @description
     * Передаёт сообщение в Node-RED
     * @param {Object} _logs      - Объект сообщения, содержащий необходимые данные
     */
    Log(_logs) {
        try {
            this.EmitEvents_logger_log({level: _logs.level, msg: _logs.msg, obj: _logs.obj, node: _logs.node});
        }
        catch (e) {
            this.EmitEvents_logger_log({level: 'W', msg: `Cannot send log message from node ${_logs.node}`, obj: _logs.msg});
        }
        
    }
    /* debug home */
    /**
     * @method
     * @description
     * Получает объект Node-RED через которую передаются сообщения из логгера
     * @param {Object} _node     - Объект ноды   
     */
    RegisterNode(_node) {
        this.#_OutNode = _node;
        this.EmitEvents_logger_log({level: 'INFO', msg: 'Proxy Logger registered NR node.'});
    }
    /**
     * @method
     * @description
     * Передаёт сообщение в Node-RED
     * @param {Object} _msg      - Объект сообщения, содержащий необходимые данные
     */
    HandlerEvents_logger_proxy(_topic, _msg) {
        const msg = {payload: _msg.value[0], topic: _topic};

        if (this.#_OutNode) {
            this.#_OutNode.send(msg);
        }
    }
    /* debug end */
}
module.exports = ClassProxyLogger;