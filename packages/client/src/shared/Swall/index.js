// part alert
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import '../../vendor/libs/sweetalert2/sweetalert2.scss';

const ReactSwal = withReactContent(
  Swal.mixin({
    buttonsStyling: false,
    customClass: {
      confirmButton: 'btn btn-primary btn-lg',
      cancelButton: 'btn btn-default btn-lg',
      actions: 'text-center'
    }
  })
);

export default ReactSwal;
