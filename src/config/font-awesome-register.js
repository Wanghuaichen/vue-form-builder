import { library } from '@fortawesome/fontawesome-svg-core';
import { faImage, faPlus, faTimes, faChevronUp, faChevronDown, faCog, faPlusCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

var FontAwesomeRegister = {};

FontAwesomeRegister.register = function() {
    library.add(faImage, faPlus, faTimes, faChevronUp,faChevronDown, faCog, faPlusCircle, faTimesCircle);
};

export {
    FontAwesomeRegister
}