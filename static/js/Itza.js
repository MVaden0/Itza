const waitForElement = (selector) => {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector))
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector))
                observer.disconnect()
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        })
    })
}

class Itza {
    constructor(options) {
        this.iconSVG = {
            code:'M5.854 4.854a.5.5 0 1 0-.708-.708l-3.5 3.5a.5.5 0 0 0 0 .7' +
            '08l3.5 3.5a.5.5 0 0 0 .708-.708L2.707 8l3.147-3.146zm4.292 0a.5' +
            '.5 0 0 1 .708-.708l3.5 3.5a.5.5 0 0 1 0 .708l-3.5 3.5a.5.5 0 0 ' +
            '1-.708-.708L13.293 8l-3.147-3.146z',
            bold:'M8.21 13c2.106 0 3.412-1.087 3.412-2.823 0-1.306-.984-2.28' +
            '3-2.324-2.386v-.055a2.176 2.176 0 0 0 1.852-2.14c0-1.51-1.162-2' +
            '.46-3.014-2.46H3.843V13H8.21zM5.908 4.674h1.696c.963 0 1.517.45' +
            '1 1.517 1.244 0 .834-.629 1.32-1.73 1.32H5.908V4.673zm0 6.788V8' +
            '.598h1.73c1.217 0 1.88.492 1.88 1.415 0 .943-.643 1.449-1.832 1' +
            '.449H5.907z',
            italic:'M7.991 11.674 9.53 4.455c.123-.595.246-.71 1.347-.807l.1' +
            '1-.52H7.211l-.11.52c1.06.096 1.128.212 1.005.807L6.57 11.674c-.' +
            '123.595-.246.71-1.346.806l-.11.52h3.774l.11-.52c-1.06-.095-1.12' +
            '9-.211-1.006-.806z',
            strikethrough:'M6.333 5.686c0 .31.083.581.27.814H5.166a2.776 2.7' +
            '76 0 0 1-.099-.76c0-1.627 1.436-2.768 3.48-2.768 1.969 0 3.39 1' +
            '.175 3.445 2.85h-1.23c-.11-1.08-.964-1.743-2.25-1.743-1.23 0-2.' +
            '18.602-2.18 1.607zm2.194 7.478c-2.153 0-3.589-1.107-3.705-2.81h' +
            '1.23c.144 1.06 1.129 1.703 2.544 1.703 1.34 0 2.31-.705 2.31-1.' +
            '675 0-.827-.547-1.374-1.914-1.675L8.046 8.5H1v-1h14v1h-3.504c.4' +
            '68.437.675.994.675 1.697 0 1.826-1.436 2.967-3.644 2.967z',
            underline:'M5.313 3.136h-1.23V9.54c0 2.105 1.47 3.623 3.917 3.62' +
            '3s3.917-1.518 3.917-3.623V3.136h-1.23v6.323c0 1.49-.978 2.57-2.' +
            '687 2.57-1.709 0-2.687-1.08-2.687-2.57V3.136zM12.5 15h-9v-1h9v1z',
            leftalign:'M2 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0' +
            ' 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1' +
            '-.5-.5zm0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-' +
            '.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z',
            centeralign:'M4 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0' +
            ' 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 ' +
            '0 1-.5-.5zm2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-' +
            '.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.' +
            '5-.5z',
            rightalign:'M6 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 ' +
            '0 1-.5-.5zm-4-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0' +
            ' 1-.5-.5zm4-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.' +
            '5-.5zm-4-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5' +
            '-.5z',
            link:'M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829' +
            'A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0' +
            ' 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.' +
            '018 0 0 1-.128-1.287 M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776' +
            'a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.' +
            '112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.58' +
            '6 4.672z',
            image:'M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0 M2.002 1a2' +
            ' 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h' +
            '-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3' +
            '.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1' +
            'h12z'
        }

        this.prefix = 'itza__editor__'

        this.container = document.querySelector('#itza__editor') || 
            options.container

        this.iconDim = 22 || options.iconDim
        this.controls = [
            'code',
            'bold',
            'italic',
            'underline',
            'strikethrough',
            'leftalign',
            'centeralign',
            'rightalign',
            'link',
            'image'
        ] || options.controls

        this.controlEvents = {
            code: this.codeEvent,
            bold: this.boldEvent,
            italic: this.italicEvent,
            underline: this.underlineEvent,
            strikethrough: this.strikethroughEvent,
            leftalign: this.leftAlignEvent,
            centeralign: this.centerAlignEvent,
            rightalign: this.rightAlignEvent,
            link: this.linkEvent,
            image: this.imageEvent
        }

        this.wrapperClass = 'content__wrapper' || options.wrapperClass
        this.menuClass = 'content__menu' || options.menuClass
        this.buttonClass = 'content__menu__button' || options.buttonClass
        this.contentClass = 'content' || options.contentClass
        this.surfaceClass = 'content__surface' || options.surfaceClass

        this.buildHTML()
        this.attachEvents()

        // initialize surface events
        waitForElement(`.${this.surfaceClass}`).then((element) => {
            element.addEventListener('keydown', (event) => {
                this.disableDefaultControls(event)

                alert(getCaretPosition(document.querySelector(`.${this.surfaceClass}`)))
            })
        })
    }

    disableDefaultControls = (event) => {
        const disabledControls = ['b', 'i', 'u', ]

        disabledControls.forEach((disabledControl) => {
            if (event.ctrlKey && event.key.toLowerCase() === disabledControl)
            {
                event.stopPropagation();
                event.preventDefault();
            }    
        })
    }

    getCaretPosition = (elem) => {
        const node_search = (node, func) => {
            let result = func(node)
        
            for (
                node = node.firstChild; 
                result !== false && node; 
                node = node.nextSibling)
            {
                result = node_search(node, func)
            }
              
            return result
        }

        const elem = document.querySelector(`.${this.surfaceClass}`)
    
        let sel = window.getSelection()
        let cum_length = [0, 0]
    
        if (sel.anchorNode == elem)
        {
            cum_length = [sel.anchorOffset, sel.extentOffset];
        }
        else 
        {
            let nodes_to_find = [sel.anchorNode, sel.extentNode]
    
            if(!elem.contains(sel.anchorNode) || !elem.contains(sel.extentNode))
            {
                return undefined
            }
            else 
            {
                let found = [0,0]
                let i
    
                node_search(elem, (node) => {
                    for(i = 0; i < 2; i++) 
                    {
                        if(node == nodes_to_find[i]) 
                        {
                            found[i] = true;
                            if(found[i == 0 ? 1 : 0])
                            {
                                return false
                            }
                        }
                    }
    
                    if (node.textContent && !node.firstChild) 
                    {
                        for(i = 0; i < 2; i++) 
                        {
                            if (!found[i])
                            {
                                cum_length[i] += node.textContent.length
                            }
                        }
                    }
                })
    
                cum_length[0] += sel.anchorOffset;
                cum_length[1] += sel.extentOffset;
            }
        }
    
        if (cum_length[0] <= cum_length[1]) 
        {
            return cum_length;
        }
        
        return [cum_length[1], cum_length[0]];
    }

    codeEvent = () => {

    }

    boldEvent = () => {

    }

    italicEvent = () => {

    }

    underlineEvent = () => {

    }

    strikethroughEvent = () => {

    }

    leftAlignEvent = () => {
        let surface = document.querySelector(`.${this.surfaceClass}`)
        
        surface.style.textAlign = 'left'
    }

    centerAlignEvent = () => {
        let surface = document.querySelector(`.${this.surfaceClass}`)
        
        surface.style.textAlign = 'center'
    }

    rightAlignEvent = () => {
        let surface = document.querySelector(`.${this.surfaceClass}`)
        
        surface.style.textAlign = 'right'
    }

    linkEvent = () => {

    }

    imageEvent = () => {

    }

    attachEvents = () => {
        this.controls.forEach((type) =>  {
            // get specific button element
            let button = document.querySelector(`#${this.prefix}${type}-button`)

            // attach respective event listener
            button.addEventListener('click', this.controlEvents[type])
        })
    }

    getCursorPosition = () => {
        const selection = document.getSelection()

        selection.modify("extend", "backward", "paragraphboundary")

        const position = selection.toString().length

        if (selection.anchorNode !== undefined) 
        {
          selection.collapseToEnd();
        }
      
        return position
    }

    buildHTML = () => {
        // add class to container
        this.container.setAttribute('class', this.wrapperClass)

        // menu
        let menu = document.createElement('div')
        menu.setAttribute('class', this.menuClass)

        // add controls to menu
        this.controls.forEach((type) => {
            menu.appendChild(this.createButton(type))
        })

        // content (surface wrapper) and surface
        let content = document.createElement('div')
        content.setAttribute('class', this.contentClass)

        let surface = document.createElement('div')
        surface.setAttribute('class', this.surfaceClass)
        surface.setAttribute('contenteditable', true)

        // dummy text
        let text = ''
        for (let i = 0; i < 1000; i += 1) {
            text += 'asdf'
        }

        surface.innerHTML = text

        content.appendChild(surface)

        // add menu and surface to container
        this.container.appendChild(menu)
        this.container.appendChild(content)
    }

    createButton = (type) => {
        // button element
        let button = document.createElement('button')
        button.setAttribute('id', `${this.prefix}${type}-button`)
        button.setAttribute('class', this.buttonClass)

        // button icon
        let icon = this.createIconSVG(type)
        button.appendChild(icon)

        return button
    }

    createIconSVG = (type) => {
        // icon svg element
        let icon = document.createElementNS(
            'http://www.w3.org/2000/svg', 
            'svg'
        )
        icon.setAttributeNS(
            'http://www.w3.org/2000/xmlns/', 
            'xmlns:xlink', 
            'http://www.w3.org/1999/xlink'
        )
        icon.setAttribute('width', `${this.iconDim}`)
        icon.setAttribute('height', `${this.iconDim}`)
        icon.setAttribute('viewBox', '0 0 16 16')

        // icon path element
        let path = document.createElementNS(
            'http://www.w3.org/2000/svg', 
            'path'
        )
        path.setAttribute('d', this.iconSVG[type])
        icon.appendChild(path)
    
        return icon
    }
}