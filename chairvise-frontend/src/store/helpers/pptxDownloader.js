import PptxGenJs from 'pptxgenjs'
import html2canvas from 'html2canvas'
import {
  PPTX_TITLE_FONT_SIZE,
  PPTX_CHART_WIDTH,
  PPTX_CHART_HEIGHT,
  PPTX_CHART_MARGIN_LEFT,
  PPTX_CHART_MARGIN_TOP
} from '@/common/const'

let pptx, mainSlide

export function downloadPPTX (presentationFormName) {
  pptx = new PptxGenJs()
  pptx.defineSlideMaster({
    title: 'MASTER_SLIDE',
    bkgd: 'FFFFFF',
    objects: [
          { 'rect': { x: 0.0, y: 5.25, w: '100%', h: 0.4, fill: 'DE8080' } },
      { 'text': { text: 'Powerpoint generated by ChairVise 3.0',
        options: { x: 3.25,
          y: 5.25,
          w: 5.5,
          h: 0.4,
          color: 'FFFFFF',
          fontSize: 14 } } }
    ]
  })
  mainSlide = pptx.addSlide({ masterName: 'MASTER_SLIDE' })
  var iconPath = require('@/assets/MenuIcon.png')
  mainSlide.addImage({ path: iconPath, x: 3, y: 0.75, w: 4.0, h: 2.0 })
  mainSlide.addText(presentationFormName, { x: 1.0,
    y: 3.5,
    fontSize: PPTX_TITLE_FONT_SIZE,
    color: '363636',
    align: 'center' })
  return createPPTX(presentationFormName)
}

function getDescription () {
  var desc = document.getElementById('presentation-description').textContent
  mainSlide.addText(desc, { x: 1.0, y: 4.15, fontSize: 14, color: '363636', align: 'center' })
}

function getChart (chartElement) {
  return html2canvas(chartElement).then(element => {
    var slide = pptx.addSlide({ masterName: 'MASTER_SLIDE'})
    let imageData = element.toDataURL('image/png')
    slide.addImage({
      data: imageData,
      x: PPTX_CHART_MARGIN_LEFT,
      y: PPTX_CHART_MARGIN_TOP,
      w: PPTX_CHART_WIDTH,
      h: PPTX_CHART_HEIGHT
    })
  })
}

async function createPPTX (presentationFormName) {
  await getDescription()
  let chartElements = document.getElementsByClassName('presentation-section')
  for (let i = 0; i < chartElements.length; i++) {
    await getChart(chartElements[i])
  }
  pptx.writeFile(presentationFormName)
}
