
var board_data = {
  size: 13,
  name: 'original',
  x: [
    '[^X]*(DN|TE|NI)'
    ,'[RONMHC]*I[RONMHC]*'
    ,'.*(..)\\1P+'
    ,'(E|RC|NM)*'
    ,'([^MC]|MM|CC)*'
    ,'R?(CR)*MC[MA]*'
    ,'.*'
    ,'.*CDD.*RRP.*'
    ,'(XHH|[^XH])*'
    ,'([^CME]|ME)*'
    ,'.*RXO.*'
    ,'.*LR.*RL.*'
    ,'.*EU.*ES.*'
  ],
  y: [
    '.*H.*H.*'
    ,'(DI|NS|TH|OM)*'
    ,'F.*[AO].*[AO].*'
    ,'(O|RHH|MM)*'
    ,'.*'
    ,'C*MC(CCC|MM)*'
    ,'[^C]*[^R]*III.*'
    ,'(...?)\\1*'
    ,'([^X]|XCC)*'
    ,'(RR|HHH)*.?'
    ,'N.*X.X.X.*E'
    ,'R*D*M*'
    ,'.(C|HH)*'
  ],
  z: [
    '.*H.*V.*G.*'
    ,'[RC]*'
    ,'M*XEX.*'
    ,'.*MCC.*DD.*'
    ,'.*X.*RCHX.*'
    ,'.*(.)(.)(.)(.)\\4\\3\\2\\1.*'
    ,'(NI|ES|IH).*'
    ,'[^C]*MMM[^C]*'
    ,'.*(.)X\\1C\\1.*'
    ,'[ROMEA]*HO[UMIEC]*'
    ,'(XR|[^R])*'
    ,'[^M]*M[^M]*'
    ,'(S|MM|HHH)*'
  ],
};

function loadPuzzle(data) {
    return JSON.parse(atob(data));
}

function savePuzzle(data) {
    // return a url to this puzzle
    var base_url = window.location.href.split('?')[0];
    var puzzle_data = btoa(JSON.stringify(data));
    return base_url + "?puzzle=" + puzzle_data;
}

var mid;
var size;
var user_data;
var use_editor;

function loadData() {
  user_data = undefined;
  try {
    user_data = JSON.parse(localStorage['xword_data_' + board_data.name]);
  } catch (e) {
  }
  if (!user_data || !user_data.rows) {
    user_data = { rows: [] };
  }
}

function saveData() {
  try {
    localStorage['xword_data_' + board_data.name] = JSON.stringify(user_data);
  } catch (e) {
    // No localstorage
  }
}

function rowSize(ii) {
  var extra = ii;
  if (extra > mid) {
    extra = size - 1 - ii;
  }
  return mid + 1 + extra;
}

function getData() {
  var ii, jj;
  var rows = [];
  for (ii = 0; ii < size; ++ii) {
    var row = [];
    for (jj = 0; jj < rowSize(ii); ++jj) {
      var id = 'cell_' + ii + '_' + jj;
      var v = $('#' + id).val();
      if (v.toUpperCase() !== v) {
        v = v.toUpperCase();
        $('#' + id).val(v.toUpperCase());
      }
      row.push(v || '?');
    }
    rows.push(row);
  }
  user_data.rows = rows;
  saveData();
}

function strReverse(str) {
  var ret = '';
  for (ii = 0; ii < str.length; ++ii) {
    ret += str[str.length - ii - 1];
  }
  return ret;
}

function checkRules() {
  var ii;
  var debug = [];

  function check(str, axis, idx) {
    var rule = board_data[axis][idx];
    var regex = new RegExp(rule);
    var match = str.match(regex);
    if (match && match[0] === str) {
      $('#rule_' + axis + '_' + idx).removeClass('nomatch');
      $('#rule_' + axis + '_' + idx).addClass('match');
    } else {
      $('#rule_' + axis + '_' + idx).removeClass('match');
      $('#rule_' + axis + '_' + idx).addClass('nomatch');
    }
    debug.push(axis + idx + ': ' + str + (match?' (match)':'') );
  }


  for (ii = 0; ii < size; ++ii) {
    var str = '';
    for (jj = 0; jj < rowSize(ii); ++jj) {
      str += user_data.rows[ii][jj];
    }
    check(str, 'y', ii);

    str = '';
    for (jj = 0; jj < size; ++jj) {
      var i = jj;
      var j = ii;
      if (jj > mid) {
        j -= (jj - mid);
      }
      if (user_data.rows[i][j] !== undefined) {
        str += user_data.rows[i][j];
      }
    }
    str = strReverse(str);
    check(str, 'x', ii);

    str = '';
    for (jj = 0; jj < size; ++jj) {
      var i = jj;
      var j = ii;
      if (jj < mid) {
        j -= (mid - jj);
      }
      if (user_data.rows[i][j] !== undefined) {
        str += user_data.rows[i][j];
      }
    }
    check(str, 'z', ii);

  }
  $('#debug').html(debug.join('<br/>'));
}

function checkArrowKeys(elem, event) {
  if (event) {
    var di = 0, dj = 0;
    if (event.which == 37) { // left arrow
      dj = -1;
    } else if (event.which == 38) { // up arrow
      di = -1;
    } else if (event.which == 39) { // right arrow
      dj = 1;
    } else if (event.which == 40) { // down arrow
      di = 1;
    }
    if (di != 0 || dj != 0) {
      var matches = $(elem).attr('id').match(/\d+/g);
      var i = parseInt(matches[0]) + di;
      var j = parseInt(matches[1]) + dj;
      if (i < size) {
        // move along same diagonal in top and bottom half
        if (di == 1 && i > size/2) {
          j--;
        } else if (di == -1 && i > size/2 - 1) {
          j++;
        }
      }
      $('#cell_' + i + '_' + j).focus().select();
      return true;
    }
  }
  return false;
}

function onInputChange(event) {
  if (!checkArrowKeys(this, event)) {
    getData();
    checkRules();
  }
}

function onFocus() {
  $(this).select();
}

function onClickCell() {
  var elem = $('#' + this.id.slice('wrap_'.length));
  elem.focus();
  elem.select();

}

function onFocusCell() {
  // Deselect all previous highlighted rules
  $('.highlighted').removeClass('highlighted');

  // Get position of current cell
  var pos_match = this.id.match(/cell_(\d+)_(\d+)/);
  var a = parseInt(pos_match[1], 10);
  var b = parseInt(pos_match[2], 10);
  var y = a;
  var x = y > mid ? b + a - mid : b;
  var z = y < mid ? b - a + mid : b;

  // Set the relevant rules as highlighted
  $('#rule_x_' + x).addClass('highlighted');
  $('#rule_y_' + y).addClass('highlighted');
  $('#rule_z_' + z).addClass('highlighted');

  $('.highlighted-cell').removeClass('highlighted-cell');

  function highlightCell(a, b) {
    $('#cell_' + a + '_' + b).addClass('highlighted-cell');
  }

  for (var bb = 0; bb < rowSize(a); ++bb) {
    highlightCell(a, bb);
  }

  var bb = x;
  for (var aa = 0; aa < size; ++aa) {
    if (aa > mid) {
      --bb;
    }
    highlightCell(aa, bb);
  }

  var bb = z;
  for (var aa = size - 1; aa >= 0; --aa) {
    if (aa < mid) {
      --bb;
    }
    highlightCell(aa, bb);
  }
}

function reset() {
  user_data.rows = [];
  saveData();
  location.reload();
}

function editRule(axis, idx) {
  var rule_span = document.getElementById('rule_' + axis + '_' + idx);
  rule_span.innerHTML = ruleInput(axis,idx);
}

function updateRule(axis, idx, value) {
  if (value == '') {
    value = '.*';
  }
  board_data[axis][idx] = value;
  var rule_span = document.getElementById('rule_' + axis + '_' + idx);
  rule_span.innerHTML = ruleDisplay(axis, idx);
  checkRules();
}

function ruleInput(axis, idx) {
  var form = '<form action="#" onsubmit="updateRule(\'' + axis + '\', ' + idx + ', rule.value);">'
  return form + '<input name="rule" value="' + board_data[axis][idx] + '"/></form>';
}

function ruleDisplay(axis, idx) {
  var open = '';
  var close = '';
  if (use_editor) {
    open = '<span ondblclick="editRule(\'' + axis + '\', ' + idx + ');">';
    close = '</span>';
  }
  return open + board_data[axis][idx] + close;
}

function getSearchParams(){
  var p={};
  location.search.replace(
    /[?&]+([^=&]+)=([^&]*)/gi,
    function(s,k,v) { p[k]=v; }
  )
  return p;
}

function blankRules(n) {
  return Array.from({length:n}, i => '.*');
}

function init() {
  loadData();
  
  var url_params = getSearchParams();
  use_editor = 'edit' in url_params;
  if ('puzzle' in url_params) {
    board_data = loadPuzzle(url_params['puzzle']);
  } else if ('new_size' in url_params) {
    var sz = url_params['new_size'];
    board_data = {
      size: sz,
      name: url_params['new_name'],
      x: blankRules(sz),
      y: blankRules(sz),
      z: blankRules(sz)
    };
  }

  mid = (board_data.size - 1) / 2;
  size = board_data.size;

  var lines = [];
  var ii, jj;
  var row = [];
  function addRule(styleboth, axis, idx) {
    var styleinner = 'rule_' + axis;
    var data = board_data[axis][idx];
    //data = styleinner + '_' + idx;
    row.push('<span class="rule_parent ' + styleboth + '"><span class="rule '
      + styleboth + ' ' + styleinner + '" id="rule_' + axis + '_' + idx
      + '">'+ruleDisplay(axis, idx)+'</span></span>');
  }
  for (ii = 0; ii <= mid; ++ii) {
    addRule('top', 'x', ii);
  }
  lines.push(row.join(''));
  for (ii = 0; ii < size; ++ii) {
    row = [];
    addRule('leftside', 'y', ii);
    for (jj = 0; jj < rowSize(ii); ++jj) {
      var id = 'cell_' + ii + '_' + jj;
      var prev_value = (user_data.rows[ii] && user_data.rows[ii][jj] || '');
      if (prev_value === '?') {
        prev_value = '';
        //prev_value = String.fromCharCode('A'.charCodeAt(0) + (ii + jj*3) % 26);
      }
      row.push('<span class="cell" id="wrap_' + id + '">'
        + '<input type="text" class="cell_input" maxlength="1" pattern="[a-zA-Z]" value="'
        + prev_value
        + '" id="' + id + '"/></span>');
    }
    if (ii < mid) {
      addRule('side', 'x', mid + ii + 1);
    } else if (ii > mid) {
      addRule('side', 'z', mid * 3 + 1 - ii);
    }
    lines.push(row.join(''));
  }
  row = [];
  for (ii = 0; ii <= mid; ++ii) {
    addRule('bottom', 'z', ii);
  }
  lines.push(row.join(''));
  $('#board').html(lines.join('<br/>'));
  $('.cell_input').change(onInputChange);
  $('.cell_input').keyup(onInputChange);
  $('.cell_input').click(onFocus);
  $('.cell').click(onClickCell);
  $('.cell_input').focus(onFocusCell);
  $('#reset').click(reset);
  if (use_editor) {
    $('.no_edit').hide();
    $('#make_link').click( () => {
      $('#puzzle_link').attr('value', savePuzzle(board_data));
    });
  } else {
    $('.edit').hide();
    $('.new_parameters').hide();
    $('#new_puzzle').click( () => {
      $('.new_parameters').show();
    });
  }
  onInputChange();
}

$(init);
