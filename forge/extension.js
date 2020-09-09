/*
function NewExtension(viewer, options) {
  Autodesk.Viewing.Extension.call(this, viewer, options);
}

NewExtension.prototype = Object.create(Autodesk.Viewing.Extension.prototype);
NewExtension.prototype.constructor = NewExtension;

NewExtension.prototype.load = function() {
  
  return true;
};

NewExtension.prototype.unload = function() {
  
  return true;
};
*/

class NewExtension extends Autodesk.Viewing.Extension {
  constructor(viewer, options) {
    super(viewer, options);
  }

  load() {
    this.viewer.overlays.addScene('new-scene');
    return true;
  }

  unload() {

    return true;
  }

  addEvent() {
    this.viewer.addEventListener(
      Autodesk.Viewing.SELECTION_CHANGED_EVENT,
      e => console.log(e)
    )
  }

  changeMaterial() {
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    this.viewer.impl.matman().addMaterial('CustomMaterial', material, true);
    const fragList = this.viewer.model.getFragmentList();
    const instanceTree = this.viewer.model.getData().instanceTree;
    instanceTree.enumNodeFragments(2702, frag => {
      console.log(frag)
      fragList.setMaterial(frag, material);
    });
  }

  addToolbar() {
    const button = new Autodesk.Viewing.UI.Button('ext-button');
    button.addClass('ext-button');
    button.setToolTip('Extension Button');
    button.onClick = e => {
      // do smth
    }
    const subToolbar = new Autodesk.Viewing.UI.ControlGroup('custom-toolbar');
    subToolbar.addControl(button);
    this.viewer.toolbar.addControl(subToolbar);
  }

  addCustomGeometry() {
    const geometry = new THREE.BoxGeometry(10, 10, 10);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(10,100,10);

    this.viewer.overlays.addMesh(mesh, 'new-scene');
  }

}

Autodesk.Viewing.theExtensionManager.registerExtension('NewExtension', NewExtension);