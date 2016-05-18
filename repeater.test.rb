require './repeater'

repeater = Repeater.new({
    :filename => "out.txt",
    # :debug => true
})

repeater.for(1, 10) do |i|
    "Hola mundo #{i}\n"
end

puts "done"

puts `more #{repeater.filename}`