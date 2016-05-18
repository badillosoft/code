require './repeater'

repeater = Repeater.new({
    :filename => "forest.txt",
    # :debug => true
})

r = Random.new
repeater.for(1, 800) do |i|
    x = r.rand(-100...100)
    z = r.rand(-100...100)

    "\t<transform translation=\"#{x} 0 #{z}\">
        <inline USE=\"tree\">
    </transform>\n"
end

puts "done"