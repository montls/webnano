#/usr/bin/env python
# -*- coding:utf-8 -*-

import misaka as m
import houdini as h
import sys
from pygments import highlight
from pygments.lexers import get_lexer_by_name
from pygments.formatters import HtmlFormatter

reload(sys)
sys.setdefaultencoding('utf-8')

#create a custom renderer
class BlogRenderer(m.HtmlRenderer, m.SmartyPants):
	def block_code(self,text,lang):
		if not lang:
			tem = '\n<pre><code>%s</code></pre>\n'% \
					h.escape_html(text.strip().decode('utf-8'))
			return tem
		lexer = get_lexer_by_name(lang, stripall=True)
		formatter = HtmlFormatter()
		return highlight(text,lexer,formatter)
	
#And use the renderer
renderer = BlogRenderer()
md = m.Markdown(renderer,
		extensions=m.EXT_FENCED_CODE 
		| m.EXT_NO_INTRA_EMPHASIS
		| m.EXT_SPACE_HEADERS
		| m.EXT_STRIKETHROUGH
		| m.EXT_SUPERSCRIPT
		| m.EXT_TABLES )

if __name__ == "__main__":
	try:
		name = sys.argv[1]
	except IndexError:
		print u"格式 python gfm.py [Markdown文件]"
		sys.exit(0)	
	if name:
		input_file = open(name,'r')
		print md.render(input_file.read())
	else:
		print u"格式 python gfm.py [Markdown文件]"
