import { empty, equal } from '@futo-ui/utils'
import { Box } from '@material-ui/core'
import { Component, createRef, forwardRef } from 'react'

class ContentEditable extends Component {
  constructor(props) {
    super(props);
    this.ref = props.innerRef || createRef();
    this.handleBlur = this.handleBlur.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    const { current } = this.ref;
    return current.innerText !== nextProps.html || !equal(this.props.sx, nextProps.sx);
  }
  componentDidUpdate() { const el = this.ref.current; if (this.props.html !== el.innerText) el.innerText = this.props.html; }
  handleBlur(e) { const { onBlur } = this.props; onBlur && onBlur(e); }
  handleInput(e) {
    const { onChange } = this.props, { innerText } = e.target;
    // Remove <br /> added if content is empty, see: https://github.com/st-h/ember-content-editable/issues/92#issuecomment-495228204
    if (empty(innerText)) { const firstChild = this.ref.current.childNodes[0]; firstChild && firstChild.remove(); } 
    onChange && onChange({ target: { value: e.target.innerText } }); }
  handleKeyDown(e) { const { onKeyDown } = this.props; onKeyDown && onKeyDown(e); }
  handlePaste(e) { e.preventDefault();
    var text = (e.originalEvent || e).clipboardData.getData('text/plain');
    document.execCommand("insertText", false, text);
  }

  render() {
    const { html = "", innerRef, onBlur, onKeyDown, placeholder, sx, ...props } = this.props;
    return <Box component="span" contentEditable dangerouslySetInnerHTML={{ __html: html }} onBlur={this.handleBlur} onInput={this.handleInput} onKeyDown={this.handleKeyDown} onPaste={this.handlePaste} placeholder={placeholder} ref={this.ref} sx={{ cursor: "text", display: "inline-block", minWidth: 1, outline: "none", "&:empty:before": { color: "#aaaaaa", content: "attr(placeholder)" }, ...sx }} {...props} />;
  }
}

export default forwardRef((props, ref) => <ContentEditable innerRef={ref} {...props} />);
