all_boards = {    
  'original': {
    size: 13,
    author: 'Dan Gulotta',
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
  },
  'tumbler': {
    size: 3,
    author: 'Kelly Boothby',
    x: ['(AC|KR|SH)', '.?[JKR][ACH].?', '(CS|KH|RE)'],
    y: ['(CK|HJ|RA)', '.?[AEH][AKS].?', '(AK|HR|JC)'],
    z: ['(AH|KJ|SA)', '.?[KRS][CHK].?', '(AS|JH|KE)']
  },
}
